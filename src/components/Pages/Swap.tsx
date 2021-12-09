import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading, Text, HStack } from "@chakra-ui/layout";
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import useTokenBalance from "hooks/useTokenBalance";
import { useTokenData } from "hooks/useTokenData";
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

  console.log({ rgt, tribe });

  return (
    <Flex direction="column">
      <Heading> Swap </Heading>
      <HStack>
        <Avatar h="100%" boxSize="15px" src={rgt.logoURL} />
        <Text>RGT Balance: {formatEther(rgtBalance ?? BigNumber.from(0))}</Text>
      </HStack>
      <HStack>
        <Avatar h="100%" boxSize="15px" src={tribe.logoURL} />

        <Text>
          TRIBE Balance: {formatEther(tribeBalance ?? BigNumber.from(0))}
        </Text>
      </HStack>
    </Flex>
  );
};

export default Swap;
