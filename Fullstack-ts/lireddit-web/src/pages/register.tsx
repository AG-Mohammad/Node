import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/UrqlClient";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useCreateUserMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values);
          if (res.data?.createUser.err) {
            setErrors(toErrorMap(res.data.createUser.err));
          } else if (!res.data?.createUser.err) {
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

export default withUrqlClient(UrqlClient, { ssr: true })(Register);
