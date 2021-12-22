import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useBlockNumber from "./useBlockNumber";

function getBlockTimestamp(library: Web3Provider, blockNum: number) {
  return async () => {
    return library.getBlock(blockNum);
  };
}

export default function useBlockTimestamp() {
  const { data: blockNum } = useBlockNumber();
  const { library } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;

  return useSWR(
    shouldFetch ? ["BlockTimestamp", blockNum] : null,
    getBlockTimestamp(library, blockNum),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
