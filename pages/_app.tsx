import { ChakraProvider } from "@chakra-ui/react";

import { Web3ReactProvider } from "@web3-react/core";
import Layout from "components/Common/Layout";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
