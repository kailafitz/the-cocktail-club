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
import Loading from "../Status/Loading";
import { useLocation } from "react-router-dom";

const DeleteCocktail = ({ cocktailId }: { cocktailId: string }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      if (location.pathname === "/profile") {
        queryClient.invalidateQueries("Get Account Details");
      } else {
        queryClient.invalidateQueries("Get All Cocktails");
      }
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
    event.preventDefault();
    setLoading(true);
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
        <Stack
          p={5}
          spacing={4}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              {" "}
              <Typography variant="body1">
                Are you sure you wish to delete?
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Button
                  variant="primaryDark"
                  type="submit"
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
              </Stack>{" "}
            </>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

DeleteCocktail.propTypes = {
  cocktailId: PropTypes.string,
};

export default DeleteCocktail;
