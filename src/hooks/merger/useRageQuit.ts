import { useMemo } from "react";
import useSWR from "swr";
import { BigNumber, constants, Contract } from "ethers";

import useContract from "hooks/useContract";
import useKeepSWRDataLiveAsBlocksArrive from "hooks/useKeepSWRDataLiveAsBlocksArrive";

import RAGEQUIT_ABI from "../../../contracts/RageQuit.json";
import { RAGEQUIT_ADDRESS } from "../../constants";
import { RageQuit } from "../../../contracts/types";
import { useWeb3React } from "@web3-react/core";

// Data
import RageQuitData from "utils/ragequit_data.json";

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

  console.log({ result });
  return result;
};

// Calculates RageQuit Amounts for user
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

  useKeepSWRDataLiveAsBlocksArrive(mutate);

  return { maxRageQuittableAmount, canRageQuit, currentRageQuittableAmount };
};
