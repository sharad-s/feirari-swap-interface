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

  const { data: rgtBalance }: SWRResponse<BigNumber, Error> = useTokenBalance(
    account,
    "0xd291e7a03283640fdc51b121ac401383a46cc623"
  );

  const { data: tribeBalance }: SWRResponse<BigNumber, Error> = useTokenBalance(
    account,
    "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b"
  );

  const rgt = useTokenData("0xd291e7a03283640fdc51b121ac401383a46cc623");
  const tribe = useTokenData("0xc7283b66eb1eb5fb86327f08e1b5816b0720212b");

  const [rgtInput, setRgtInput] = useState("");

  const exchangeRate = usePegExchangeRate();

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
    <Flex direction="row" w="100%" h="100%" flexGrow={1} color="white">
      {/* Left side */}
      <VStack
        flexGrow={0}
        h="100%"
        w="50%"
        spacing="4"
        align="start"
        id="POOP"
        px={10}
      >
        {/* Box */}
        <Flex
          direction="column"
          w="80%"
          h="400px"
          border="1px solid grey"
          borderRadius="lg"
          px={10}
          py={10}
          my="auto"
          mx="auto"
        >
          <Heading> Swap RGT for TRIBE </Heading>

          <VStack align="start" bg="" my={4} mb={8}>
            <Text>You have:</Text>
            <HStack>
              <Avatar h="100%" boxSize="15px" src={rgt?.logoURL} />
              <Text fontWeight="bold">
                {formatEther(rgtBalance ?? BigNumber.from(0))} RGT
              </Text>
            </HStack>
          </VStack>

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
                placeholder="RGT to swap"
                _placeholder={{
                  fontWeight: "bold",
                }}
              />
              <InputRightElement
                children={
                  <HStack>
                    <HStack>
                      <Avatar h="100%" boxSize="15px" src={rgt?.logoURL} />
                      <Text>RGT</Text>
                    </HStack>

                    <Button
                      onClick={() =>
                        setRgtInput(
                          formatEther(rgtBalance ?? BigNumber.from(0))
                        )
                      }
                      background="black"
                      color="white"
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
                placeholder="TRIBE recieved"
                disabled
                _placeholder={{
                  fontWeight: "bold",
                }}
                fontWeight="bold"
              />
              <InputRightElement
                children={
                  <HStack>
                    <HStack>
                      <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
                      <Text>TRIBE</Text>
                    </HStack>
                  </HStack>
                }
              />
            </InputGroup>
            {/* <HStack align="center">
          <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
          <Text>
            TRIBE Balance: {formatEther(tribeBalance ?? BigNumber.from(0))}
          </Text>
        </HStack> */}
          </VStack>

          <Button onClick={handleSwap} w="100%" colorScheme="green">
            Swap
          </Button>
        </Flex>
      </VStack>
      {/* Right Side */}
      <VStack w="50%" h="100%" flexGrow={0} flexShrink={0} bg="">
        <Image
          src="http://assets.stickpng.com/images/5845ca7c1046ab543d25238b.png"
          w="70%"
          h="70%"
          mx="auto"
          my="auto"
        />
      </VStack>
    </Flex>
  );
};

export default Swap;
