import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Text, HStack, VStack } from "@chakra-ui/layout";
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
    alert(
      `Swapping ${formatUnits(
        parseEther(rgtInput)
      )} for ${tribeReceived} TRIBE`
    );
  };

  return (
    <Flex direction="column">
      <Heading> Swap </Heading>
      {/* <HStack>
        <Avatar h="100%" boxSize="15px" src={rgt?.logoURL} />
        <Text>RGT Balance: {formatEther(rgtBalance ?? BigNumber.from(0))}</Text>
      </HStack>
      <HStack>
        <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />

        <Text>
          TRIBE Balance: {formatEther(tribeBalance ?? BigNumber.from(0))}
        </Text>
      </HStack> */}

      <VStack align="flex-start">
        <HStack align="center">
          <Input
            w="100%"
            value={rgtInput}
            onChange={({ target: { value } }) => {
              setRgtInput(value);
            }}
            placeholder="RGT to swap"
          />
          <Button
            onClick={() =>
              setRgtInput(formatEther(rgtBalance ?? BigNumber.from(0)))
            }
          >
            Max
          </Button>
        </HStack>
        <HStack align="center">
          <Avatar h="100%" boxSize="15px" src={rgt?.logoURL} />
          <Text>
            RGT Balance: {formatEther(rgtBalance ?? BigNumber.from(0))}
          </Text>
        </HStack>
      </VStack>

      <VStack align="flex-start">
        <Input
          w="100%"
          value={tribeReceived}
          placeholder="TRIBE recieved"
          disabled
        />
        <HStack align="center">
          <Avatar h="100%" boxSize="15px" src={tribe?.logoURL} />
          <Text>
            TRIBE Balance: {formatEther(tribeBalance ?? BigNumber.from(0))}
          </Text>
        </HStack>
      </VStack>

      <Button onClick={handleSwap}>Swap</Button>
    </Flex>
  );
};

export default Swap;
