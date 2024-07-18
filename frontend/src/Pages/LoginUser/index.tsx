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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "./Schema";

let initialState = {
  id: 0,
  email: "",
  password: "",
};

const LoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<ILogin>(initialState);
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: initialState,
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const values = getValues();
  console.log("user", user);
  console.log("values", values);
  console.log(errors);

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
      setTimeout(() => {
        setLoading(false);
        queryClient.invalidateQueries("Authentication Status Check");
        navigate("/profile");
      }, 2000);
    },
    onError: (error: AxiosError) => {
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(
          typeof error.response?.data === "string"
            ? error.response?.status === 500
              ? `${error.message}`
              : `${error.response?.data}`
            : "Something has gone wrong. Please try again later."
        );
      }, 2000);
    },
  });

  const onSubmit: SubmitHandler<ILogin> = async () => {
    setLoading(true);
    mutation.mutate(user);
  };

  return (
    <ViewHeightContainer pt center>
      <Grid container justifyContent="center">
        <Grid xs={12} md={5}>
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
            {loading ? (
              <Loading color="light" />
            ) : (
              <>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label="Email"
                      type="email"
                      required
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
                      required
                      onChange={(event) => {
                        setUser({ ...user, password: event.target.value });
                        onChange(event.target.value);
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
