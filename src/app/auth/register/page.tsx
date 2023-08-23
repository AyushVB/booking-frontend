"use client";

import { register } from "@/components/api/auth";
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
import { Righteous } from "next/font/google";

import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        const response = await register(
          values.name,
          values.email,
          values.password
        );

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
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing="10">
                <Stack spacing="5">
                  <FormControl
                    isInvalid={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
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
                  <FormControl
                    isInvalid={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="4">
                  <Button type="submit">Sign Up</Button>
                  <Text color="fg.muted" align={"center"}>
                    Have an account?{" "}
                    <Link href="login" color={"blue"}>
                      Sign In
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Register;
