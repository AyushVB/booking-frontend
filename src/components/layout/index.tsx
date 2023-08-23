import { Box, Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

const Layout = (props: { children: JSX.Element }) => {
  return (
    <Flex minH={"100vh"} direction={"column"}>
      <Header />
      <Box mt={"auto"} mb={"auto"}>
        {props.children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
