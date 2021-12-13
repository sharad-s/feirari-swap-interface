import useContract from "./useContract";
import PEG_EXCHANGER_ABI from "../../contracts/PegExchanger.json";
import { PegExchanger } from "../../contracts/types";
import { BigNumber, Contract } from "ethers";
import { PEG_EXCHANGER_ADDRESS } from "../constants";

export const usePegExchangeRate = () => {
  const contract: PegExchanger = useContract(
    PEG_EXCHANGER_ADDRESS,
    PEG_EXCHANGER_ABI
  );

  //   const swap = useCallback(
  //       () => {
  //           contract.tribeAccept()
  //       },
  //       [contract],
  //   )

  return BigNumber.from(26);
};
