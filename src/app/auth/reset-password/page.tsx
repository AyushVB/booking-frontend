"use client";

import { resetPassword } from "@/components/api/auth";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        const response = await resetPassword(values.password, "", "");

        localStorage.setItem("token", response.token);
        console.log("Submit: " + localStorage.getItem("token"));
      } else {
        console.log("password and confirm-password is not same");
      }
    },
  });
  return (
    <>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading>Welcome!!!</Heading>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="10">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirm-password">
                    Confirm Password
                  </FormLabel>
                  <Input id="confirm-password" type="password" />
                </FormControl>
              </Stack>
              <Stack spacing="4">
                <Button>Sign Up</Button>
                <Text color="fg.muted" align={"center"}>
                  Have an account?{" "}
                  <Link href="login" color={"blue"}>
                    Sign In
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ResetPassword;
