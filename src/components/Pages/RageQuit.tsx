import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Flex,
  Heading,
  Text,
  HStack,
  VStack,
  Box,
  Spacer,
  Center,
} from "@chakra-ui/layout";
import { formatEther, formatUnits, parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { TOKEN_ADDRESSES } from "../../constants";
import { BigNumber } from "ethers";
import useTokenBalance from "hooks/useTokenBalance";
import { useTokenData } from "hooks/useTokenData";
import { useMemo, useState } from "react";
import { SWRResponse } from "swr";

import {
  useRageQuitAmount,
  useRageQuitExchangeRate,
} from "hooks/merger/useRageQuit";

const Swap = () => {
  const { account } = useWeb3React();

  const { data: tribeBalance }: SWRResponse<BigNumber, Error> = useTokenBalance(
    account,
    TOKEN_ADDRESSES.TRIBE
  );

  const exchangeRate = useRageQuitExchangeRate();
  const {
    maxRageQuittableAmount,
    canRageQuit,
    currentRageQuittableAmount,
    merkleProofArray,
  } = useRageQuitAmount();
  console.log({
    exchangeRate,
    maxRageQuittableAmount,
    canRageQuit,
    merkleProofArray,
  });

  const fei = useTokenData(TOKEN_ADDRESSES.FEI);
  const tribe = useTokenData(TOKEN_ADDRESSES.TRIBE);

  const [tribeInput, setTribeInput] = useState("");

  const feiReceived = useMemo(() => {
    if (!tribeInput || !exchangeRate) return "0";

    return formatUnits(parseEther(tribeInput).mul(exchangeRate), 27);
  }, [tribeInput, exchangeRate]);

  const handleSwap = () => {
    if (!tribeInput || isNaN(parseFloat(tribeInput))) return;
    alert(`Swapping ${formatUnits(parseEther(tribeInput))} TRIBE`);
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      w="100%"
      h={{base: "30%", lg: "100%"}}
      flexGrow={1}
      mt={{base: "35px", lg: "0"} }
      color="white"
    >
      {/* Left side */}
      <VStack
        flexGrow={0}
        h="100%"
        w={{ base: "100%", lg: "50%" }}
        spacing="4"
        align="start"
        px={5}

      >
        {/* Box */}
        <Flex
          direction="column"
          w={{base: "100%", sm: "80%"}}
          h="400px"
          borderRadius="lg"
          bgGradient="linear-gradient(90deg, rgba(5,53,181,1) 0%, rgba(23,141,207,1) 100%)"
          px={{base: 5, sm: 10}}
          py={5}
          my="auto"
          mx="auto"
        >
          <Heading> TRIBE-FEI (RageQuit) </Heading>

          <HStack w="100%" align="start" justify="start" my={1}>
            <VStack align="start" bg="" my={4}>
              <Text>You have:</Text>
              <HStack>
                <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                <Text fontWeight="bold">
                  {parseFloat(
                    formatEther(tribeBalance ?? BigNumber.from(0))
                  ).toFixed(4)}{" "}
                  TRIBE
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <VStack align="start" bg="" pt={4}>
              <Text>You can ragequit:</Text>
              <HStack>
                <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                <Text fontWeight="bold">
                  {formatEther(currentRageQuittableAmount ?? BigNumber.from(0))}{" "}
                  TRIBE
                </Text>
              </HStack>
            </VStack>
            <Spacer />
          </HStack>

          <VStack align="flex-start" w="100%">
            <InputGroup w="100%" size="lg">
              <Input
                type="number"
                inputMode="decimal"
                w="100%"
                size="lg"
                value={tribeInput}
                onChange={({ target: { value } }) => {
                  setTribeInput(value);
                }}
                fontWeight="bold"
                placeholder="TRIBE to swap"
                _placeholder={{
                  fontWeight: "bold",
                }}
              />
              <InputRightElement
                children={
                  <HStack w="100%" mr={"30px"} justify="end" align="center">
                    <Button
                      onClick={() =>
                        setTribeInput(
                          formatEther(
                            maxRageQuittableAmount ?? BigNumber.from(0)
                          )
                        )
                      }
                      background="transparent"
                      color="#adadad"
                      border="1px"
                      borderColor="#adadad"
                      margin={0}
                      h="30%"
                      _hover={{}}
                      _active={{}}
                      _focus={{boxShadow:""}}
                      p={1}
                    >
                      <Text fontSize="sm"> Max </Text>
                    </Button>
                    <HStack>
                      <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                      <Text>TRIBE</Text>
                    </HStack>


                  </HStack>
                }
              />
            </InputGroup>
          </VStack>

          <Center w="100%" my={3}>
            <ArrowDownIcon />
          </Center>

          <VStack align="flex-start" w="100%" mb={4}>
            <InputGroup w="100%" size="lg">
              <Input
                w="100%"
                size="lg"
                value={feiReceived}
                placeholder="FEI recieved"
                disabled
                _placeholder={{
                  fontWeight: "bold",
                }}
                fontWeight="bold"
              />
              <InputRightElement
                children={
                  <HStack w="100%" mr={"30px"} justify="end" align="center">
                    <Avatar h="100%" boxSize="15px" src={fei?.logoURL} />
                    <Text>FEI</Text>
                  </HStack>
                }
              />
            </InputGroup>
          </VStack>

          <Button
            onClick={handleSwap}
            disabled={!canRageQuit}
            w="100%"
            colorScheme="green"
          >
            {!canRageQuit ? "You Cannot Ragequit." : "Swap TRIBE for FEI"}
          </Button>
        </Flex>
      </VStack>
      {/* Right Side */}
      <VStack
        w={{ base: "100%", lg: "50%" }}
        h={{base: "60%", lg: "100%"}}
        pb={{base: "150px", sm: "0px"}}
        flexGrow={0}
        flexShrink={0}
        bg=""
      >
        <Image
          src="pablo.jpg"
          w={{base: "90%" ,sm: "70%" }}
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
