import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { ILogin } from "../../Interfaces";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import FormFeedback from "../../Components/Alert";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import Loading from "../../Components/Status/Loading";

const LoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ILogin>({
    id: 0,
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data: ILogin) => {
      return api.post(
        "api/login",
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
      setLoading(false);
      queryClient.invalidateQueries("Authentication Status Check");
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    },
    onError: (error: AxiosError) => {
      setLoading(false);
      setErrorMessage(
        typeof error.response?.data === "string"
          ? error.response?.status === 500
            ? `${error.message}`
            : `${error.response?.data}`
          : "Something has gone wrong. Please try again later."
      );
    },
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
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
            spacing={3}
          >
            {loading ? (
              <Loading color="light" />
            ) : (
              <>
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
                <Button variant="primaryDark" type="submit">
                  Login
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </ViewHeightContainer>
  );
};

export default LoginUser;
