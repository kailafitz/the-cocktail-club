import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { LoginInterface } from "../../Interfaces";
import FormField from "../../Components/TextField";

import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import FormFeedback from "../../Components/Alert";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/material/Button";

const LoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginInterface>({
    id: 0,
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data: LoginInterface) => {
      return axios.post(
        "http://localhost:5001/api/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      console.log("Redirect");
      queryClient.invalidateQueries("authenticationStatus");
      // navigate("/profile");
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    },
    onError: (error: AxiosError) => {
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : "Something has gone wrong. Please try again later."
      );
    },
  });

  const handleLogin = async (e: any) => {
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
            onSubmit={handleLogin}
            sx={{ div: { mb: 2 } }}
          >
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
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </ViewHeightContainer>
  );
};

export default LoginUser;
