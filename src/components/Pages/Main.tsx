import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { ArrowDownIcon } from "@chakra-ui/icons";
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
  Center,
} from "@chakra-ui/layout";
import { formatEther, formatUnits, parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import useTokenBalance from "hooks/useTokenBalance";
import { useTokenData } from "hooks/useTokenData";
import { useMemo, useState } from "react";
import { SWRResponse } from "swr";

import { usePegExchangeRate } from "hooks/merger/usePegExchangeRate";
import { usePegExchangeSwap } from "hooks/merger/usePegExchangeSwap";
import { TOKEN_ADDRESSES } from "../../constants";
import { chakra } from "@chakra-ui/system";
const Swap = () => {
  const { account } = useWeb3React();

  const { data: rgtBalance, mutate }: SWRResponse<BigNumber, Error> =
    useTokenBalance(account, TOKEN_ADDRESSES.RGT);

  const { data: tribeBalance }: SWRResponse<BigNumber, Error> = useTokenBalance(
    account,
    TOKEN_ADDRESSES.TRIBE
  );

  const rgt = useTokenData(TOKEN_ADDRESSES.RGT);
  const tribe = useTokenData(TOKEN_ADDRESSES.TRIBE);

  const [rgtInput, setRgtInput] = useState("");

  const exchangeRate = usePegExchangeRate();
  const { swap, swapStep } = usePegExchangeSwap();

  const tribeReceived = useMemo(() => {
    if (!rgtInput || !exchangeRate) return "0";

    return formatUnits(parseEther(rgtInput).mul(exchangeRate), 27);
  }, [rgtInput, exchangeRate]);

  const handleSwap = async () => {
    if (!rgtInput || isNaN(parseFloat(rgtInput))) return;
    // alert(
    //   `Swapping ${formatUnits(
    //     parseEther(rgtInput)
    //   )} RGT for ${tribeReceived} TRIBE`
    // );
    await swap(parseEther(rgtInput));
    mutate();
  };

  const error = useMemo(() => {
    if (!rgtBalance) {
      return "You have no RGT";
    }

    if (!rgtInput) {
      return "Enter a value";
    }

    console.log({
      rgtInput,
      rgtBalance,
      rgtInputBN: BigNumber.from(rgtInput),
    });

    if (parseEther(rgtInput).gt(rgtBalance)) {
      return "You don't have enough RGT";
    }
    // if (maxRageQuittableAmount.isZero()) {
    //   return "Ineligible for Ragequit";
    // }
    // if (maxRageQuittableAmount.gt(0) && currentRageQuittableAmount.isZero()) {
    //   return "You have already Ragequit";
    // }
    // if (tribeBalance.isZero()) {
    //   return "You have no TRIBE";
    // }
    return undefined;
  }, [rgtInput, rgtBalance, tribeBalance]);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      //justifyContent="start"
      w="100%"
      h={{ base: "30%", lg: "100%" }}
      flexGrow={1}
      mt={{ base: "35px", lg: "0" }}
      color="white"
    >
      {/* Left side */}
      <VStack
        flexGrow={0}
        h="100%"
        w={{ base: "100%", lg: "100%" }}
        spacing="4"
        align="start"
        px={5}
        py={5}
      >
        {/* Box */}
        <Flex
          direction="column"
          w={{ base: "100%", sm: "80%" }}
          h="100%"
          // border="1px solid grey"
          borderRadius="lg"
          px={{ base: 5, sm: 10 }}
          py={5}
          my="auto"
          mx="auto"
        //   bgGradient="grey"
        //   bg="grey"
        >
          <Heading> Swap RGT for TRIBE </Heading>
          
        </Flex>
      </VStack>
     
    </Flex>
  );
};

export default Swap;
