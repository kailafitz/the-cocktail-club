import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { ICocktailCustom, ICocktailUpload } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";
import Loading from "../Status/Loading";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CocktailSchema } from "../CreateCocktailForm/Schema";

const EditCocktail = ({ cocktail }: { cocktail: ICocktailCustom }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [updatedCocktail, setUpdatedCocktail] = useState(cocktail);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ICocktailUpload>({
    defaultValues: cocktail,
    resolver: zodResolver(CocktailSchema),
  });

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

  const onSubmit = async (event: any) => {
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
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Cocktail Name"
                    defaultValue={cocktail.name}
                    onChange={(event) => {
                      onChange(event.target.value);
                      setUpdatedCocktail({
                        ...cocktail,
                        name: event.target.value,
                      });
                    }}
                    required
                  />
                )}
              />
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Button variant="primaryDark" fullWidth type="submit">
                  Update
                </Button>
                <Button variant="primaryLight" fullWidth onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Dialog>
    </div>
  );
};

EditCocktail.propTypes = {
  cocktail: PropTypes.object,
};

export default EditCocktail;
