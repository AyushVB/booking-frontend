import { Avatar, Button, HStack, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        bg={"black"}
        px={"10"}
        py={"3"}
        mb={"5"}
      >
        <Heading color={"gray.200"}>Booking</Heading>
        <HStack>
          <Button
            onClick={() => {
              localStorage.clear();
              router.push("/auth/login");
            }}
          >
            Logout
          </Button>
          <Avatar
            src="https://bit.ly/broken-link"
            onClick={() => router.push("/profile")}
          />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
