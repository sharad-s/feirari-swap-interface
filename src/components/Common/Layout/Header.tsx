import {
  Box,
  Flex,
  Spacer,
  Avatar,
  HStack,
  Text,
  Collapse,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import Account from "components/Connected/Account";
import AppLink from "components/Common/AppLink";
import ETHBalance from "components/Connected/ETHBalance";
import TokenBalance from "components/Connected/TokenBalance";
import useEagerConnect from "hooks/useEagerConnect";

import Link from "next/link";
import { useEffect, useState } from "react";

export const NewHeader = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  return (
    <VStack w="100%">
      <Flex
        px={4}
        height="50px"
        justify="flex-start"
        align="center"
        overflowX="visible"
        overflowY="visible"
        width="100%"
        zIndex={3}
        borderBottom="1px solid grey"
        color="white"
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
            <Text fontWeight="bold  ">Swap</Text>
          </AppLink>
          <Spacer />

          <AppLink href="/ngmi">
            <Text fontWeight="bold  ">RageQuit</Text>
          </AppLink>
        </HStack>
        <Spacer />
        <Account triedToEagerConnect={triedToEagerConnect} />
      </Flex>

      <Collapse
        in={show}
        animateOpacity
        style={{ width: "100%", margin: "0px" }}
      >
        <Box
          w="100%"
          h="50px"
          color="white"
          bg="#FF5058"
          // rounded="md"
          // shadow="md"
        >
          <Center h="100%" w="100%">
            <Text fontWeight="bold">
              {" "}
              🎄 5D 12H 15M LEFT UNTIL RAGEQUIT HOLIDAY SALE ENDS! 🎄{" "}
            </Text>
          </Center>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default NewHeader;
