import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { ISignUp } from "../../Interfaces";
import FormFeedback from "../../Components/Alert";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";
import Loading from "../../Components/Status/Loading";

const SignupUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ISignUp>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data: ISignUp) => {
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
      setLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    },
    onError: (error: AxiosError) => {
      setLoading(false);
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : ""
      );
    },
  });

  const handleSignup = (e: any) => {
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
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <Stack
                direction="column"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSignup}
                spacing={3}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={3}
                >
                  <TextField
                    sx={{ width: "-webkit-fill-available" }}
                    label="First Name"
                    onChange={(event) =>
                      setUser({ ...user, firstName: event.target.value })
                    }
                  />
                  <TextField
                    sx={{ width: "-webkit-fill-available" }}
                    label="Last Name"
                    onChange={(event) =>
                      setUser({ ...user, lastName: event.target.value })
                    }
                  />
                </Stack>
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
                <Button variant="primaryDark" type="submit">
                  Sign up
                </Button>
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    </ViewHeightContainer>
  );
};

export default SignupUser;
