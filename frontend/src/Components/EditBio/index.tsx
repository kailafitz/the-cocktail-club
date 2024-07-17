import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { IUser } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";
import Loading from "../Status/Loading";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditBioSchema } from "./Schema";

const EditBio = ({ user }: { user: IUser }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<{ bio: string }>({
    defaultValues: {
      bio: "",
    },
    resolver: zodResolver(EditBioSchema),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: string) => {
      return api.put(
        "api/profile/set-bio",
        { data },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      console.log("Bio updated successfully");
      setTimeout(() => {
        setLoading(false);
        queryClient.invalidateQueries("Get Account Details");
        handleClose();
      }, 1500);
    },
    onError: (error: AxiosError) => {
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(
          typeof error.response?.data === "string"
            ? `${error.response?.data}`
            : ""
        );
      }, 1500);
    },
  });

  const onSubmit: SubmitHandler<{ bio: string }> = async (event: any) => {
    setLoading(true);
    mutation.mutate(userBio);
  };

  return (
    <>
      <Button
        variant="primaryDark"
        fullWidth
        onClick={handleOpen}
        data-target={user.id.toString()}
      >
        Edit
      </Button>
      <Dialog open={open} id={user.id.toString()}>
        <Stack
          direction="column"
          spacing={2}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          p={5}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <Controller
                name="bio"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Bio"
                    multiline
                    rows={4}
                    defaultValue={user.bio}
                    onChange={(event) => {
                      setUserBio(event.target.value);
                      onChange(event.target.value);
                    }}
                  />
                )}
              />
              {errors.bio?.message && (
                <FormFeedback message={errors.bio?.message} severity="error" />
              )}
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Button variant="primaryDark" fullWidth type="submit">
                  Update
                </Button>
                <Button variant="primaryLight" fullWidth onClick={handleClose}>
                  Cancel
                </Button>
              </Stack>{" "}
            </>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

EditBio.propTypes = {
  user: PropTypes.object,
};

export default EditBio;
