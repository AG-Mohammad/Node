import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { useLoginUserMutation } from "../generated/graphql";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, logging] = useLoginUserMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await logging(values);
          if (res.data?.login.err) {
            setErrors(toErrorMap(res.data.login.err));
          } else if (!res.data?.login.err) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
                required
              />
            </Box>
            {/* <Box mt={4}>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
                required
              />
            </Box> */}
            <Box mt={4}>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
                required
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
