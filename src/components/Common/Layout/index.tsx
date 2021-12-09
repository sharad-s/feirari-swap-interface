import { Flex } from "@chakra-ui/layout";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Flex
      height="100%"
      flex={1}
      direction="column"
      justify="flex-start"
      align="flex-start"
    >
      <Header />
      <Flex
        height="100%"
        width="100%"
        flex={1}
        direction="column"
        justify="flex-start"
        align="flex-start"
        bg="pink"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
