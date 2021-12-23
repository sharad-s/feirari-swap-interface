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
          <Heading>Join the Tribe</Heading>
          The rari dao is merging with the tribe
          <Spacer />
          <Heading size="md">How was the new DAO created?</Heading>
          <Text>
            Governance for all Rari products will remain identical, simply
            substituting the RGT token out for TRIBE and using TRIBE
            quorum/proposal threshold of 25M and 2.5M, respectively. We will
            deploy a new OZ Governor Bravo that is powered by TRIBE to govern
            the existing Rari timelock. There will be 2 Timelocks and governance
            tabs on Tally, both powered by TRIBE.
          </Text>
          <Spacer />
          <Heading size="md">If I own RGT, what do I do?</Heading>
          <Text>
            If you are an RGT holder, you can swap to TRIBE at an exchange rate
            of $26.70 RGT/TRIBE. Use the swap interface to exchange RGT for
            Tribe and make sure to delegate your Tribe to participate in
            governance.
          </Text>
          <Spacer />
          <Heading size="md">
            How soon do I need to exchange RGT to Tribe?
          </Heading>
          <Text>
            There is no set expiration for this swap period to end, but it is
            recommended to swap early so you can participate in governance and
            the future of the Tribe DAO. Any changes to the swap period will be
            well announced and communicated to RGT holders.
          </Text>
          <Spacer />
          <Heading size="md">What is RageQuit?</Heading>
          <Text>
            The RageQuit allows TRIBE holders from block 13623378 to be able to
            sell their TRIBE for newly minted FEI at the “Intrinsic Value”.
            Intrinsic Value is calculated as Protocol equity / circulating
            TRIBE. Protocol equity is PCV - user FEI, and circulating TRIBE is
            total supply - treasury - liquidity mining TRIBE. These holders can
            only exchange TRIBE up to the amount held at block 13623378. To
            check availability, look in the json map here:
            fei-protocol-core/ragequit_data.json at feat/merger ·
            fei-protocol/fei-protocol-core · GitHub 36. Note that users can
            ragequit partial amounts, and rage quit multiple times up to a
            cumulative value of the amount held at block 13623378.
          </Text>
          <Spacer />
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Swap;
