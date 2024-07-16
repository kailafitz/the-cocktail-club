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

const EditBio = ({ user }: { user: IUser }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userBio, setUserBio] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
      setLoading(false);
      queryClient.invalidateQueries("Get Account Details");
      handleClose();
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

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
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
          onSubmit={handleSubmit}
          p={5}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <TextField
                label="Bio"
                multiline
                rows={4}
                defaultValue={user.bio}
                onChange={(event) => setUserBio(event.target.value)}
              />
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
