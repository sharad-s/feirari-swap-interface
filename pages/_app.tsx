import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { Web3ReactProvider } from "@web3-react/core";
import Layout from "components/Common/Layout";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
