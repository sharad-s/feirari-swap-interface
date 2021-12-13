import useSWR from "swr";

export const ETH_TOKEN_DATA = {
  symbol: "ETH",
  address: "0x0000000000000000000000000000000000000000",
  name: "Ethereum",
  decimals: 18,
  color: "#627EEA",
  overlayTextColor: "#fff",
  logoURL:
    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/64/Ethereum-ETH-icon.png",
};

export interface TokenData {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  color: string;
  overlayTextColor: string;
  logoURL: string;
}

export const fetchTokenData = async (address: string): Promise<TokenData> => {
  let data;

  if (address !== ETH_TOKEN_DATA.address) {
    try {
      // Since running the vercel functions requires a Vercel account and is super slow,
      // just fetch this data from the live site in development:
      let url = "https://app.rari.capital/api/tokenData?address=" + address;
      data = {
        ...(await fetch(url).then((res) => res.json())),
        address: address,
      };
    } catch (e) {
      data = {
        name: null,
        address: null,
        symbol: null,
        decimals: null,
        color: null,
        overlayTextColor: null,
        logoURL: null,
      };
    }
  } else {
    console.log("eth2 address", address);
    data = ETH_TOKEN_DATA;
  }

  return data as TokenData;
};

export const useTokenData = (
  address: string | undefined
): TokenData | undefined => {
  const { data: tokenData } = useSWR(address + " tokenData", async () => {
    return !!address ? await fetchTokenData(address) : undefined;
  });
  return tokenData;
};
