import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import Stack from "@mui/material/Stack";
import FormFeedback from "../Alert";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const DeleteCocktail = ({ cocktailId }: { cocktailId: string }) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`api/cocktail/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess() {
      console.log("Deletion success");
      handleClose();
      queryClient.invalidateQueries("Get All Cocktails");
    },
    onError: (error: AxiosError) => {
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : ""
      );
    },
  });

  const deleteCocktail = async (event: any) => {
    event.preventDefault();
    mutation.mutate(cocktailId);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleOpen}
        data-target={cocktailId.toString()}
      >
        Delete
      </Button>
      <Dialog open={open} id={cocktailId.toString()}>
        <Stack p={5} spacing={4} component="form" noValidate autoComplete="off">
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          <Typography variant="body2">
            Are you sure you wish to delete?
          </Typography>
          <Button variant="primary" fullWidth onClick={deleteCocktail}>
            Delete
          </Button>
          <Button variant="primary" fullWidth onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

DeleteCocktail.propTypes = {
  cocktailId: PropTypes.string,
};

export default DeleteCocktail;
