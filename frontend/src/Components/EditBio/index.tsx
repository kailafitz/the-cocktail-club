import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { UserInterface } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import FormField from "../TextField";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { api } from "../../axios";

const EditBio = ({ user }: { user: UserInterface }) => {
  const queryClient = useQueryClient();
  const [userBio, setUserBio] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
      queryClient.invalidateQueries("Get Account Details");
    },
    onError: (error: AxiosError) => {
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : ""
      );
    },
  });

  const updateBio = async (event: any) => {
    event.preventDefault();
    mutation.mutate(userBio);
  };

  return (
    <>
      <Button
        variant="primary"
        fullWidth
        onClick={handleClickOpen}
        data-target={user.id.toString()}
      >
        Edit
      </Button>
      <Dialog open={open} id={user.id.toString()}>
        <Stack
          direction="column"
          spacing={4}
          component="form"
          noValidate
          autoComplete="off"
          p={5}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          <FormField
            label="Bio"
            value={user.bio}
            onChange={(event) => setUserBio(event.target.value)}
          />
          <Button
            variant="primary"
            fullWidth
            onClick={(event) => {
              updateBio(event);
            }}
          >
            Update
          </Button>
          <Button variant="primary" fullWidth onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

EditBio.propTypes = {
  user: PropTypes.object,
};

export default EditBio;
