import useContract from "./useContract";
import PEG_EXCHANGER_ABI from "../../contracts/PegExchanger.json";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import { PegExchanger } from "../../contracts/types";
import { BigNumber, Contract } from "ethers";
import { PEG_EXCHANGER_ADDRESS } from "../constants";

const fetchPegExchangeRate = async (contract: Contract) => {
  const x = await contract.callStatic.exchangeRate();
  console.log({ x });
  return x;
};

export const usePegExchangeRate = () => {
  const contract: Contract = useContract(
    PEG_EXCHANGER_ADDRESS,
    PEG_EXCHANGER_ABI
  );

  console.log({ contract });

  const result = useSWR(["exchangeRate"], () => fetchPegExchangeRate(contract));

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return BigNumber.from(26);
};
