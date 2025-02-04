import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../axios";
import { IUser } from "../../Interfaces";
import FormFeedback from "../Alert";
import Loading from "../Status/Loading";
import { EditBioSchema } from "./Schema";

const EditBio: React.FC<{ user: IUser }> = ({ user }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userBio, setUserBio] = useState(user.bio);
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
              <Typography
                variant="copyright"
                sx={{
                  opacity: 1,
                  alignSelf: "flex-end",
                  color: user.bio.length > 255 ? "red" : "primary.main",
                }}
              >
                {userBio.length} / 255
              </Typography>
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }) as PropTypes.Validator<IUser>,
};

export default EditBio;
