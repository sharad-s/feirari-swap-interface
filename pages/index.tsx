import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import useEagerConnect from "hooks/useEagerConnect";
import Main from "components/Pages/Main";
import Swap from "components/Pages/Swap";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <>
      <Head>
        <title>FeiRari </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Swap />

      {/* <Box w="100%" h="100%" flexGrow={1}>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/mirshko/next-web3-boilerplate">
            next-web3-boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <ETHBalance />

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )}
      </Box> */}
    </>
  );
}

export default Home;
