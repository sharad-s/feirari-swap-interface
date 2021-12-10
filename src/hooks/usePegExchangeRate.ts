import useContract from "./useContract";
import PEG_EXCHANGER_ABI from "../../contracts/PegExchanger.json";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import { PegExchanger } from "../../contracts/types";
import { BigNumber } from "ethers";

const PEG_EXCHANGER_ADDRESS = "";

const fetchPegExchangeRate = async (contract: PegExchanger) => {
  return await contract.callStatic.exchangeRate();
};

export const usePegExchangeRate = () => {
  const contract: PegExchanger = useContract(
    PEG_EXCHANGER_ADDRESS,
    PEG_EXCHANGER_ABI
  );

  const result = useSWR("exchangeRate", () => fetchPegExchangeRate(contract));

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return BigNumber.from(26);
};
