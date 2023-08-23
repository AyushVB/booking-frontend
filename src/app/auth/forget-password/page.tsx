"use client";

import { sentResetPasswordEmail } from "@/components/api/auth";
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
  email: yup.string().email().required(),
});

const SentResetPasswordEmail = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submit: " + values.email);
      const response = await sentResetPasswordEmail(values.email);
      console.log(response);
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
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading>Reset Password</Heading>
              <Text>Create a new password to login your account.</Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl
                    isInvalid={
                      formik.touched.email && Boolean(formik.errors.email)
                    }
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Stack>

                <Stack spacing="6">
                  <Button type="submit">Submit</Button>

                  <Link href="login" color={"blue"}>
                    Log In
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default SentResetPasswordEmail;
