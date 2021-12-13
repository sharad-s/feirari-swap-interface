import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { BigNumber, constants, Contract } from "ethers";

import useContract from "hooks/useContract";
import useKeepSWRDataLiveAsBlocksArrive from "hooks/useKeepSWRDataLiveAsBlocksArrive";

import ERC20_ABI from "../../../contracts/ERC20.json";
import RAGEQUIT_ABI from "../../../contracts/RageQuit.json";
import { RAGEQUIT_ADDRESS, TOKEN_ADDRESSES } from "../../constants";
import { ERC20, RageQuit } from "../../../contracts/types";
import { useWeb3React } from "@web3-react/core";

// Data
import RageQuitData from "utils/ragequit_data.json";
import { createTree } from "utils/merkle";
import { solidityKeccak256 } from "ethers/lib/utils";

// Exchange rate
export const useRageQuitExchangeRate = () => {
  const rageQuitContract: RageQuit = useContract(
    RAGEQUIT_ADDRESS,
    RAGEQUIT_ABI
  );

  const { data, mutate } = useSWR(
    ["exchangeRate", rageQuitContract?.address],
    async () => {
      const exchangeRate =
        await rageQuitContract.callStatic.intrinsicValueExchangeRateBase();
      return exchangeRate;
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(mutate);

  const result = useMemo(() => {
    const exchangeRate: BigNumber = data;
    if (data) {
      return exchangeRate;
    }
    return constants.WeiPerEther.div(BigNumber.from(10).pow(9));
  }, [data]);

  return result;
};

// Calculates RageQuit Amounts and MerkleProof for user
export const useRageQuitAmount = () => {
  const { account } = useWeb3React();

  const rageQuitContract: RageQuit = useContract(
    RAGEQUIT_ADDRESS,
    RAGEQUIT_ABI
  );

  const maxRageQuittableAmount: BigNumber = useMemo(() => {
    const maxAmount = RageQuitData[account];
    if (!maxAmount) {
      return BigNumber.from(0);
    } else {
      return BigNumber.from(maxAmount);
    }
  }, [account]);

  const canRageQuit: boolean = useMemo(
    () => !maxRageQuittableAmount.isZero(),
    [maxRageQuittableAmount]
  );

  const { data: currentRageQuittableAmount, mutate } = useSWR(
    "currentRageQuittableAmount for " +
      account +
      " with maxRageQuit " +
      maxRageQuittableAmount.toString(),
    async () => {
      const claimedAmount = await rageQuitContract.callStatic.claimed(account);
      return maxRageQuittableAmount.sub(claimedAmount);
    }
  );

  const merkleProofArray = useMemo(() => {
    let maxAmount = RageQuitData[account];
    if (!maxAmount) return undefined;

    const tree = createTree();
    const leaf = solidityKeccak256(
      ["address", "uint256"],
      [account, maxAmount]
    );

    // Construct proof for user
    const proof = tree.getProof(leaf);
    const proofArray = [];
    proof.map(function (key, index) {
      proofArray.push(key.data);
    });

    return proofArray;
  }, [account]);

  useKeepSWRDataLiveAsBlocksArrive(mutate);

  return {
    maxRageQuittableAmount,
    canRageQuit,
    currentRageQuittableAmount,
    merkleProofArray,
  };
};

export const useRageQuit = () => {
  const { account } = useWeb3React();

  const rageQuitContract: RageQuit = useContract(
    RAGEQUIT_ADDRESS,
    RAGEQUIT_ABI
  );

  const tribeContract: ERC20 = useContract(TOKEN_ADDRESSES.TRIBE, ERC20_ABI);

  const { maxRageQuittableAmount, merkleProofArray, canRageQuit } =
    useRageQuitAmount();

  const [swapStep, setSwapStep] = useState<
    "APPROVING" | "SWAPPING" | "LOADING" | undefined
  >();

  const swapFn = useCallback(
    (amountBN: BigNumber) => {
      if (canRageQuit) {
        swapTRIBEForFei(
          rageQuitContract,
          tribeContract,
          amountBN,
          maxRageQuittableAmount,
          merkleProofArray,
          account,
          setSwapStep
        )
          .then(() => {
            setSwapStep(undefined);
          })
          .catch((err) => {
            console.log({ err });
            setSwapStep(undefined);
          });
      }
    },
    [rageQuitContract, tribeContract, account, canRageQuit, setSwapStep]
  );

  return { swap: swapFn, swapStep };
};

// Checks allowance and exchanges RGT for Fei
export const swapTRIBEForFei = async (
  contract: RageQuit,
  tribeContract: ERC20,
  amountBN: BigNumber,
  maxAmount: BigNumber,
  merkleProofs: any[],
  account: string,
  setStep: (x: "APPROVING" | "SWAPPING" | "LOADING" | undefined) => void
) => {
  setStep("LOADING");

  // Token
  const allowance = await tribeContract.callStatic.allowance(
    account,
    RAGEQUIT_ADDRESS
  );

  console.log({
    amountBN,
    account,
    tribeContract,
    allowanceBN: allowance,
    allowance: allowance.toString(),
    shouldApprove: allowance.lt(amountBN),
  });

  if (allowance.lt(amountBN)) {
    setStep("APPROVING");
    await tribeContract.approve(RAGEQUIT_ADDRESS, constants.MaxUint256);
  }

  setStep("SWAPPING");
  const tx = await contract.ngmi(amountBN, maxAmount, merkleProofs);
  await tx.wait(1);

  setStep(undefined);
};
