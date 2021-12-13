import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Flex,
  Heading,
  Text,
  HStack,
  VStack,
  Box,
  Spacer,
} from "@chakra-ui/layout";
import { formatEther, formatUnits, parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { usePegExchangeRate } from "hooks/usePegExchangeRate";
import useTokenBalance from "hooks/useTokenBalance";
import { useTokenData } from "hooks/useTokenData";
import { useMemo, useState } from "react";
import { SWRResponse } from "swr";

const Swap = () => {
  const { account } = useWeb3React();

  const { data: tribeBalance }: SWRResponse<BigNumber, Error> = useTokenBalance(
    account,
    "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b"
  );

  const fei = useTokenData("0x956f47f50a910163d8bf957cf5846d573e7f87ca");
  const tribe = useTokenData("0xc7283b66eb1eb5fb86327f08e1b5816b0720212b");

  const [rgtInput, setRgtInput] = useState("");

  const exchangeRate = usePegExchangeRate();
  console.log({ exchangeRate });

  const tribeReceived = useMemo(() => {
    if (!rgtInput || !exchangeRate) return "0";
    return formatUnits(parseEther(rgtInput).mul(exchangeRate), 18);
  }, [rgtInput, exchangeRate]);

  const handleSwap = () => {
    if (!rgtInput || isNaN(parseFloat(rgtInput))) return;
    alert(
      `Swapping ${formatUnits(parseEther(rgtInput))} for ${tribeReceived} TRIBE`
    );
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      w="100%"
      h="100%"
      flexGrow={1}
      color="white"
    >
      {/* Left side */}
      <VStack
        flexGrow={0}
        h="100%"
        w={{ base: "100%", md: "50%" }}
        spacing="4"
        align="start"
        px={10}
      >
        {/* Box */}
        <Flex
          direction="column"
          w="80%"
          h="400px"
          borderRadius="lg"
          bgGradient="linear-gradient(90deg, rgba(5,53,181,1) 0%, rgba(23,141,207,1) 100%)"
          px={10}
          py={10}
          my="auto"
          mx="auto"
        >
          <Heading> TRIBE-FEI (RageQuit) </Heading>

          <HStack w="100%" align="start" justify="start" my={4}>
            <VStack align="start" bg="">
              <Text>You have:</Text>
              <HStack>
                <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                <Text fontWeight="bold">
                  {formatEther(tribeBalance ?? BigNumber.from(0))} TRIBE
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <VStack align="start" bg="">
              <Text>You can ragequit:</Text>
              <HStack>
                <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                <Text fontWeight="bold">
                  {formatEther(tribeBalance ?? BigNumber.from(0))} TRIBE
                </Text>
              </HStack>
            </VStack>
            <Spacer />
          </HStack>

          <VStack align="flex-start" w="100%" mb={4}>
            <InputGroup w="100%">
              <Input
                w="100%"
                size="lg"
                value={rgtInput}
                onChange={({ target: { value } }) => {
                  setRgtInput(value);
                }}
                fontWeight="bold"
                placeholder="TRIBE to swap"
                _placeholder={{
                  fontWeight: "bold",
                }}
              />
              <InputRightElement
                children={
                  <HStack w="100%" mr={"150px"} justify="start" align="center">
                    <HStack>
                      <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                      <Text>RGT</Text>
                    </HStack>

                    <Button
                      onClick={() =>
                        setRgtInput(
                          formatEther(tribeBalance ?? BigNumber.from(0))
                        )
                      }
                      background="black"
                      color="white"
                      margin={0}
                      h="30%"
                      p={1}
                    >
                      Max
                    </Button>
                  </HStack>
                }
              />
            </InputGroup>
          </VStack>

          <VStack align="flex-start" w="100%" mb={4}>
            <InputGroup w="100%" size="lg">
              <Input
                w="100%"
                size="lg"
                value={tribeReceived}
                placeholder="FEI recieved"
                disabled
                _placeholder={{
                  fontWeight: "bold",
                }}
                fontWeight="bold"
              />
              <InputRightElement
                children={
                  <HStack w="100%" mr={"150px"} justify="start">
                    <Avatar h="100%" boxSize="15px" src={fei?.logoURL} />
                    <Text>FEI</Text>
                  </HStack>
                }
              />
            </InputGroup>
          </VStack>

          <Button onClick={handleSwap} w="100%" colorScheme="green">
            Swap TRIBE for FEI
          </Button>
        </Flex>
      </VStack>
      {/* Right Side */}
      <VStack
        w={{ base: "100%", md: "50%" }}
        h="100%"
        flexGrow={0}
        flexShrink={0}
        bg=""
      >
        <Image
          src="https://esquilo.io/png/thumb/wJZCNNoWGoPmnmE-Sad-Pepe-The-Frog-PNG-Transparent-Picture.png "
          w="70%"
          h="70%"
          mx="auto"
          my="auto"
          alt="Sad Pepe"
        />
      </VStack>
    </Flex>
  );
};

export default Swap;
