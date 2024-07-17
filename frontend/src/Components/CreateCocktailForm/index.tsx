import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { ICocktailCustom, ICocktailUpload } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { api } from "../../axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../Status/Loading";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import { CocktailSchema } from "./Schema";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateCocktailForm = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let initialState: ICocktailUpload = {
    id: 0,
    name: "",
    category: "Alcoholic",
    ingredients: [],
    instructions: [],
    image: null,
  };
  const [cocktail, setCocktail] = useState(initialState);
  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ICocktailUpload>({
    defaultValues: initialState,
    resolver: zodResolver(CocktailSchema),
  });

  const values = getValues();

  const handleOpen = () => {
    reset();
    clearErrors();
    setCocktail(initialState);
    mutation.reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: ICocktailCustom) => {
      return api.post(
        "api/create-cocktail",
        { data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess() {
      console.log("Success");
      setTimeout(() => {
        setLoading(false);
        if (location.pathname === "/profile") {
          queryClient.invalidateQueries("Get Account Details");
        } else {
          queryClient.invalidateQueries("Get All Cocktails");
        }
        handleClose();
      }, 1500);
    },
    onError: (error: AxiosError) => {
      setTimeout(() => {
        setLoading(false);
        if (
          typeof error.response?.data === "string" &&
          error.response?.data !== "Unauthorised"
        ) {
          setErrorMessage(error.response?.data);
        }
      }, 1500);
    },
  });

  // console.log("values", values);
  // console.log("errors", errors);
  console.log("cocktail", cocktail);
  // console.log("error", mutation.error);

  const onSubmit: SubmitHandler<ICocktailUpload> = async () => {
    setLoading(true);
    // reset(); // reset values
    mutation.reset(); // reset error
    mutation.mutate(cocktail);
  };

  return (
    <>
      <Box>
        <Button
          variant="primaryDark"
          onClick={handleOpen}
          data-target="create-cocktail"
          startIcon={<AddIcon />}
        >
          Add Cocktail
        </Button>
      </Box>
      <Dialog open={open} id="create-cocktail">
        <Stack
          component="form"
          encType="multipart/form-data"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          spacing={4}
          alignSelf="center"
          p={5}
          sx={{ width: "-webkit-fill-available" }}
        >
          {mutation.isError && loading === false && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <Controller
                name="id"
                control={control}
                render={({ field }) => <input hidden />}
              />
              <Controller
                name="name"
                control={control}
                defaultValue={cocktail.name}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Cocktail Name"
                    value={value}
                    onChange={(event) => {
                      setCocktail({ ...cocktail, name: event.target.value });
                      onChange(event.target.value);
                    }}
                    required
                  />
                )}
              />
              {errors.name?.message && (
                <FormFeedback message={errors.name?.message} severity="error" />
              )}
              <Controller
                name="category"
                control={control}
                defaultValue={cocktail.category}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={(event) => {
                      setCocktail({
                        ...cocktail,
                        category: event.target.value as
                          | "Alcoholic"
                          | "Non-alcoholic",
                      });
                      onChange(event.target.value);
                    }}
                    required
                  >
                    <MenuItem value="Alcoholic">Alcoholic</MenuItem>
                    <MenuItem value="Non-alcoholic">Non-alcoholic</MenuItem>
                  </Select>
                )}
              />
              {errors.category?.message && (
                <FormFeedback
                  message={errors.category?.message}
                  severity="error"
                />
              )}
              <Controller
                name="ingredients"
                control={control}
                defaultValue={cocktail.ingredients}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Ingredients"
                    value={value}
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setCocktail({ ...cocktail, ingredients: arr });
                      onChange(arr);
                    }}
                    required
                  />
                )}
              />
              {errors.ingredients?.message && (
                <FormFeedback
                  message={errors.ingredients?.message}
                  severity="error"
                />
              )}
              <Controller
                name="instructions"
                control={control}
                defaultValue={cocktail.instructions}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    label="Instructions"
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setCocktail({ ...cocktail, instructions: arr });
                      onChange(arr);
                    }}
                    required
                  />
                )}
              />
              {errors.instructions?.message && (
                <FormFeedback
                  message={errors.instructions?.message}
                  severity="error"
                />
              )}
              <Stack direction="row" spacing={3} alignItems="center">
                <Button
                  component="label"
                  role={undefined}
                  variant="primaryDark"
                  tabIndex={-1}
                  fullWidth={false}
                >
                  <FileUploadIcon />
                  {/* Upload file */}
                  <Controller
                    name="image"
                    control={control}
                    defaultValue={initialState.image}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <VisuallyHiddenInput
                        type="file"
                        name="image"
                        onChange={(event) => {
                          console.log(
                            event.target.files ? event.target.files[0] : null
                          );
                          setCocktail({
                            ...cocktail,
                            image: event.target.files
                              ? event.target.files[0]
                              : null,
                          });
                          onChange(
                            event.target.files ? event.target.files[0] : null
                          );
                        }}
                        accept=".png, .jpeg, .jpg, .webp"
                        required
                      />
                    )}
                  />
                </Button>
                <Typography variant="body1">
                  File uploaded:{" "}
                  {typeof cocktail.image === "object" && cocktail.image
                    ? cocktail.image?.name
                    : null}
                </Typography>
              </Stack>
              {errors.image?.message && (
                <FormFeedback
                  message={errors.image?.message}
                  severity="error"
                />
              )}
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Button
                  variant="primaryDark"
                  type="submit"
                  sx={{ width: "-webkit-fill-available" }}
                >
                  Add Cocktail
                </Button>
                <Button
                  variant="primaryLight"
                  onClick={handleClose}
                  sx={{ width: "-webkit-fill-available" }}
                >
                  Cancel
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateCocktailForm;
