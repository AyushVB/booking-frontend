"use client";

import { loggedUser } from "@/components/api/auth";
import {
  reservationOfSeat,
  reserveById,
  reserveSeat,
} from "@/components/api/booking";
import Layout from "@/components/layout";
import {
  Box,
  SimpleGrid,
  GridItem,
  Container,
  HStack,
  Text,
  Button,
  Flex,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<number>(-1);
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);
  const [yourReservation, setYourReservation] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const resSeat = async () => {
    const response = await loggedUser();
    const response1 = await reserveById();
    const response2 = await reserveSeat();

    if (response1.resSeat) setYourReservation(response1.resSeat);
    if (response2.resSeat) setReservedSeats(response2.resSeat);
    if (response.status !== "success") {
      localStorage.clear();
      router.push("/auth/login");
    } else {
      localStorage.setItem("user", JSON.stringify(response.user));

      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      resSeat();
    } else {
      localStorage.clear();
      router.push("/auth/login");
    }
  }, []);

  const handleClick = async () => {
    const response = await reservationOfSeat(selectedSeat);
    localStorage.setItem("token1", response.token);
    localStorage.setItem("seat-id", response.id);

    router.push("/reserve-seat");
  };
  if (loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h="100vh" w="full">
        <CircularProgress isIndeterminate color="green.500" />
      </Flex>
    );
  } else {
    return (
      <Layout>
        <Container maxW={"6xl"}>
          <HStack justify={"space-evenly"} m={5}>
            <HStack>
              <Box w={3} h={3} bg={"green"} border={"1px"}></Box>
              <Text>Selcted</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg={"white"} border={"1px"}></Box>
              <Text>Available</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg={"gray"} border={"1px"}></Box>
              <Text>Reserved</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg={"red"} border={"1px"}></Box>
              <Text>Your-Reservation</Text>
            </HStack>
          </HStack>
          <SimpleGrid
            templateColumns={{
              base: "repeat(4, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(10, 1fr)",
              lg: "repeat(10, 1fr)",
            }}
            gap={3}
            w={"full"}
          >
            {[...Array(100)].map((item, i) => {
              let bgColor = "gray.100";
              if (yourReservation.includes(i + 1)) {
                bgColor = "red";
              } else if (reservedSeats.includes(i + 1)) {
                bgColor = "gray";
              } else if (selectedSeat === i + 1) {
                bgColor = "green";
              }
              return (
                <GridItem key={i + 1}>
                  <Box
                    bg={bgColor}
                    py={3}
                    textAlign={"center"}
                    border={"1px"}
                    onClick={() => {
                      if (!reservedSeats.includes(i + 1)) {
                        if (selectedSeat == i + 1) {
                          setSelectedSeat(-1);
                        } else {
                          setSelectedSeat(i + 1);
                        }
                      }
                    }}
                  >
                    {i + 1}
                  </Box>
                </GridItem>
              );
            })}
          </SimpleGrid>
          <HStack mt={"10"}>
            <Text>Selected seat for reservation : </Text>
            <Text color={"red"} ml={"2"}>
              {" "}
              {selectedSeat != -1 ? selectedSeat : "_"}
            </Text>

            <Button ml={"20"} onClick={handleClick}>
              Reserve
            </Button>
          </HStack>
        </Container>
      </Layout>
    );
  }
}
