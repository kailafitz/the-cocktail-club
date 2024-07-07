import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { SignUpInterface } from "../../Interfaces";
import FormFeedback from "../../Components/Alert";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import FormField from "../../Components/TextField";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/material/Button";
import { api } from "../../axios";

const SignupUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SignUpInterface>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm_password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data: SignUpInterface) => {
      return api.post(
        "api/sign-up",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirm_password: data.confirm_password,
        },
        { withCredentials: true }
      );
    },
    onSuccess() {
      navigate("/");
    },
    onError: (error: AxiosError) => {
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : ""
      );
    },
  });

  const handleSignup = (e: any) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <ViewHeightContainer pt center>
      <Grid container justifyContent="center">
        <Grid xs={12} md={5}>
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          <Stack
            direction="column"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSignup}
            sx={{ div: { mb: 2 } }}
          >
            <FormField
              label="First Name"
              onChange={(event) =>
                setUser({ ...user, firstName: event.target.value })
              }
            />
            <FormField
              label="Last Name"
              onChange={(event) =>
                setUser({ ...user, lastName: event.target.value })
              }
            />
            <FormField
              label="Email"
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
            <FormField
              label="Password"
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
            <FormField
              label="Confirm Password"
              onChange={(event) => {
                setUser({ ...user, confirm_password: event.target.value });
              }}
            />
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </ViewHeightContainer>
  );
};

export default SignupUser;
