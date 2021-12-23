import {
  Box,
  Flex,
  Spacer,
  Avatar,
  AvatarGroup,
  HStack,
  Text,
  Collapse,
  VStack,
  Center,
  useDisclosure,
  Image,
  chakra,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import Account from "components/Connected/Account";
import AppLink from "components/Common/AppLink";
import ETHBalance from "components/Connected/ETHBalance";
import TokenBalance from "components/Connected/TokenBalance";
import useEagerConnect from "hooks/useEagerConnect";

import Link from "next/link";
import { useEffect, useState } from "react";
import useCountdown from "hooks/useCountdown";

export const NewHeader = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [show, setShow] = useState(false);

  const countdwon = useCountdown();

  useEffect(() => {
    setTimeout(() => setShow(true), 1000);
  }, []);

  return (
    <VStack w="100%" zIndex={100}>
      <Flex
        px={4}
        height="50px"
        justify="flex-start"
        align="center"
        overflowX="visible"
        overflowY="visible"
        width="100%"
        zIndex={3}
        color="white"
        // bg="pink"
      >
        <HStack>
          <AppLink href="/">
            <AvatarGroup h="100%">
              <Avatar
                h="100%"
                boxSize="30px"
                src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x956F47F50A910163D8BF957Cf5846D573E7f87CA/logo.png"
              />
              <Avatar
                h="100%"
                boxSize="30px"
                src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD291E7a03283640FDc51b121aC401383A46cC623/logo.png"
              />
            </AvatarGroup>
          </AppLink>

          <Spacer />
          <AppLink href="https://docs.google.com/document/d/1ZUAeS36lTwJjr0xRbtVamTYOWT2yew2mw6L9CcVO1mU/edit?usp=sharing">
            <Text fontWeight="bold">ℹ️ Info</Text>
          </AppLink>

          <Spacer />

          <AppLink href="/swap">
            <Text fontWeight="bold">🎅 Swap</Text>
          </AppLink>
          <Spacer />

          <AppLink href="/ngmi">
            <Text fontWeight="bold">
              😡 RageQuit <chakra.span fontSize="xs">({countdwon.join(":")})</chakra.span>
            </Text>
          </AppLink>

          <Spacer />
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
          // bg="#2E6F43"
          // rounded="md"
          // shadow="md"
        >
          <Image
            w="100%"
            h="50px"
            src="https://cdn.discordapp.com/attachments/895862086343749722/923070154370334791/candy_cane_banner.png"
            position="absolute"
            zIndex={-1}
          />
          <Center h="100%" w="100%">
            <Text fontWeight="bold" textAlign="center" bg="#2E6F43" h="100%">
              {" "}
              <Center h="100%" w="100%">
                {/* {countdwon.join(" ")} LEFT UNTIL HOLIDAY TRIBE SALE ENDS! */}
                🎄 HOLIDAY SALE ON TRIBE ACTIVE NOW!🎄{" "}
              </Center>
            </Text>
          </Center>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default NewHeader;
