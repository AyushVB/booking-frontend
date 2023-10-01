"use client";

import { login } from "@/components/api/auth";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
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
import { useRouter } from "next/navigation";
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await login(values.email, values.password);

      localStorage.setItem("token", response.token);
      router.push("/");
    },
  });

  return (
    <Flex alignItems={"center"} justifyContent={"center"} height={"80vh"}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8" my={"auto"}>
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading>Welcome!!!</Heading>
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
                </Stack>

                <Link href="forget-password" color={"blue"}>
                  Forgot password?
                </Link>

                <Stack spacing="6">
                  <Button type="submit">Sign in</Button>
                  <Text color="fg.muted" align={"center"}>
                    Don&apos;t have an account?{" "}
                    <Link href="register" color={"blue"}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Login;
