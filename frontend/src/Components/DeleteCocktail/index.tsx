import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import Stack from "@mui/material/Stack";
import FormFeedback from "../Alert";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../../axios";

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
      return api.delete(`api/cocktail/${id}`, {
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
        sx={{ px: "6px" }}
        variant="primaryDark"
        onClick={handleOpen}
        data-target={cocktailId.toString()}
      >
        <DeleteIcon />
      </Button>
      <Dialog open={open} id={cocktailId.toString()}>
        <Stack p={5} spacing={4} component="form" noValidate autoComplete="off">
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          <Typography variant="body1">
            Are you sure you wish to delete?
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Button
              variant="primaryDark"
              onClick={deleteCocktail}
              sx={{ width: "-webkit-fill-available" }}
            >
              Delete
            </Button>
            <Button
              variant="primaryLight"
              onClick={handleClose}
              sx={{ width: "-webkit-fill-available" }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

DeleteCocktail.propTypes = {
  cocktailId: PropTypes.string,
};

export default DeleteCocktail;
