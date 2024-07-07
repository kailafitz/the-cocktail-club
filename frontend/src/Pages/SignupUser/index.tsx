import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { SignUpInterface } from "../../Interfaces";
import FormFeedback from "../../Components/Alert";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";

const SignupUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<SignUpInterface>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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
          confirmPassword: data.confirmPassword,
        },
        { withCredentials: true }
      );
    },
    onSuccess() {
      console.log("Redirect");
      queryClient.invalidateQueries("Authentication Status Check");
      // navigate("/profile");
      setTimeout(() => {
        navigate("/profile");
      }, 500);
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
            <TextField
              label="First Name"
              onChange={(event) =>
                setUser({ ...user, firstName: event.target.value })
              }
            />
            <TextField
              label="Last Name"
              onChange={(event) =>
                setUser({ ...user, lastName: event.target.value })
              }
            />
            <TextField
              label="Email"
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
            <TextField
              type="password"
              label="Password"
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
            <TextField
              type="password"
              label="Confirm Password"
              onChange={(event) => {
                setUser({ ...user, confirmPassword: event.target.value });
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
