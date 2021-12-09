import { Flex, Spacer, Avatar, HStack, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import Account from "components/Connected/Account";
import AppLink from "components/Common/AppLink";
import ETHBalance from "components/Connected/ETHBalance";
import TokenBalance from "components/Connected/TokenBalance";
import useEagerConnect from "hooks/useEagerConnect";

import Link from "next/link";

export const NewHeader = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <>
      <Flex
        color="black"
        px={4}
        height="50px"
        justify="flex-start"
        align="center"
        overflowX="visible"
        overflowY="visible"
        width="100%"
        zIndex={3}
        borderBottom="1px solid grey"
        // bg="pink"
      >
        <HStack>
          <AppLink href="/">
            <Avatar
              h="100%"
              boxSize="30px"
              src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD291E7a03283640FDc51b121aC401383A46cC623/logo.png"
            />
          </AppLink>

          <Spacer />

          <AppLink href="/swap">
            <Text>Swap</Text>
          </AppLink>
          <Spacer />

          <AppLink href="/ngmi">
            <Text>RageQuit</Text>
          </AppLink>
        </HStack>
        <Spacer />
        <Account triedToEagerConnect={triedToEagerConnect} />
      </Flex>
    </>
  );
};

export default NewHeader;
