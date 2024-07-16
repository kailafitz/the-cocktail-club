import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { ICocktailCustom } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";

const EditCocktail = ({ cocktail }: { cocktail: ICocktailCustom }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [updatedCocktail, setUpdatedCocktail] = useState(cocktail);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: ICocktailCustom) => {
      return api.put(
        `api/cocktail/${cocktail.id}`,
        { data },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      console.log("Cocktail updated successfully");
      setLoading(false);
      handleClose();
      queryClient.invalidateQueries("Get Cocktail Details");
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
    mutation.mutate(updatedCocktail);
  };

  return (
    <div>
      <Button
        variant="primaryDark"
        onClick={handleOpen}
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
          onSubmit={handleSubmit}
          p={5}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          <TextField
            label="Cocktail Name"
            defaultValue={cocktail.name}
            onChange={(event) =>
              setUpdatedCocktail({ ...cocktail, name: event.target.value })
            }
          />
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Button variant="primaryDark" fullWidth type="submit">
              Update
            </Button>
            <Button variant="primaryLight" fullWidth onClick={handleClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
};

EditCocktail.propTypes = {
  cocktail: PropTypes.object,
};

export default EditCocktail;
