import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { CocktailCustomInterface } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import FormFeedback from "../Alert";
import FormField from "../TextField";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const EditCocktail = ({ cocktail }: { cocktail: CocktailCustomInterface }) => {
  const queryClient = useQueryClient();
  const [updatedCocktail, setUpdatedCocktail] = useState(cocktail);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: CocktailCustomInterface) => {
      return axios.put(
        `/api/cocktail/${cocktail.id}`,
        { data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    onSuccess() {
      console.log("Cocktail updated successfully");
      handleClose();
      queryClient.invalidateQueries("cocktailDetails");
    },
    onError: (error: AxiosError) => {
      setErrorMessage(
        typeof error.response?.data === "string"
          ? `${error.response?.data}`
          : ""
      );
    },
  });

  const updateCocktail = async (event: any) => {
    event.preventDefault();
    mutation.mutate(updatedCocktail);
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleClickOpen}
        data-target={cocktail.id}
      >
        Edit
      </Button>
      <Dialog open={open} id={cocktail.id.toString()}>
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
            label="Cocktail Name"
            value={cocktail.name}
            onChange={(event) =>
              setUpdatedCocktail({ ...cocktail, name: event.target.value })
            }
          />
          <Button
            variant="primary"
            fullWidth
            onClick={(event) => {
              updateCocktail(event);
            }}
          >
            Update
          </Button>
          <Button variant="primary" fullWidth onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
};

EditCocktail.propTypes = {
  cocktail: PropTypes.object,
};

export default EditCocktail;