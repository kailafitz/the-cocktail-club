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
import { zodResolver } from "@hookform/resolvers/zod";
import { FullSignupSchema } from "./Schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";

let initialState = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const SignupUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<ISignUp>(initialState);
  const {
    control,
    handleSubmit,
    // reset,
    // getValues,
    formState: { errors },
  } = useForm<ISignUp>({
    defaultValues: initialState,
    resolver: zodResolver(FullSignupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

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
      // console.log("Redirect");
      queryClient.invalidateQueries("Authentication Status Check");
      setTimeout(() => {
        setLoading(false);
        navigate("/profile");
      }, 2000);
    },
    onError: (error: AxiosError) => {
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(
          typeof error.response?.data === "string"
            ? `${error.response?.data}`
            : ""
        );
      }, 2000);
    },
  });

  const onSubmit: SubmitHandler<ISignUp> = async () => {
    setLoading(true);
    mutation.mutate(user);
  };

  return (
    <ViewHeightContainer center>
      {!loading && <Typography variant="pageHeading">Sign up</Typography>}
      <Grid container justifyContent="center">
        <Grid xs={12} md={5}>
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <Stack
                direction="column"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                spacing={3}
              >
                {mutation.isError && loading === false && (
                  <FormFeedback severity="error" message={errorMessage} />
                )}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={user.firstName}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        sx={{ width: "100%", maxWidth: { md: "50%" } }}
                        label="First Name"
                        onChange={(event) => {
                          setUser({ ...user, firstName: event.target.value });
                          onChange(event.target.value);
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={user.lastName}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        sx={{ width: "100%" }}
                        label="Last Name"
                        onChange={(event) => {
                          setUser({ ...user, lastName: event.target.value });
                          onChange(event.target.value);
                        }}
                      />
                    )}
                  />
                </Stack>
                {errors.firstName?.message && (
                  <FormFeedback
                    message={errors.firstName?.message}
                    severity="error"
                  />
                )}
                {errors.lastName?.message && (
                  <FormFeedback
                    message={errors.lastName?.message}
                    severity="error"
                  />
                )}
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label="Email"
                      onChange={(event) => {
                        setUser({ ...user, email: event.target.value });
                        onChange(event.target.value);
                      }}
                    />
                  )}
                />
                {errors.email?.message && (
                  <FormFeedback
                    message={errors.email?.message}
                    severity="error"
                  />
                )}
                <Controller
                  name="password"
                  control={control}
                  defaultValue={user.password}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <TextField
                      type="password"
                      label="Password"
                      onChange={(event) => {
                        setUser({ ...user, password: event.target.value });
                        onChange(event?.target.value);
                      }}
                    />
                  )}
                />
                {errors.password?.message && (
                  <FormFeedback
                    message={errors.password?.message}
                    severity="error"
                  />
                )}
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue={user.confirmPassword}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <TextField
                      type="password"
                      label="Confirm Password"
                      onChange={(event) => {
                        setUser({
                          ...user,
                          confirmPassword: event.target.value,
                        });
                        onChange(event.target.value);
                      }}
                    />
                  )}
                />
                {errors.confirmPassword?.message && (
                  <FormFeedback
                    message={errors.confirmPassword?.message}
                    severity="error"
                  />
                )}
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
