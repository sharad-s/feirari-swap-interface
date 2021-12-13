import useContract from "../useContract";
import PEG_EXCHANGER_ABI from "../../../contracts/PegExchanger.json";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import { PegExchanger } from "../../../contracts/types";
import { BigNumber, constants, Contract } from "ethers";
import { PEG_EXCHANGER_ADDRESS } from "../../constants";
import { useMemo } from "react";

export const usePegExchangeRate = () => {
  const contract: PegExchanger = useContract(
    PEG_EXCHANGER_ADDRESS,
    PEG_EXCHANGER_ABI
  );

  const { data, mutate } = useSWR(
    ["exchangeRate", contract?.address],
    async () => {
      const exchangeRate = await contract.callStatic.exchangeRate();
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
