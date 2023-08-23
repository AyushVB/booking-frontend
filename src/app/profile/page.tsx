"use client";

import {
  Box,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "a",
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let c = localStorage.getItem("user");
    if (c !== null) setUser(JSON.parse(c));
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h="100vh" w="full">
        <CircularProgress isIndeterminate color="green.500" />
      </Flex>
    );
  } else {
    return (
      <>
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", sm: "8" }}
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading>User Details</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{ base: "transparent", sm: "bg.surface" }}
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Text p={"5"}>Name: {user !== null ? user.name : ""}</Text>
              <Text p={"5"}>Email: {user !== null ? user.email : ""}</Text>
            </Box>
            <Link
              onClick={() => {
                router.push("/");
              }}
            >
              <center>Home</center>
            </Link>
          </Stack>
        </Container>
      </>
    );
  }
};

export default Profile;
