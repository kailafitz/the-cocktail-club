import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { api } from "../../axios";
import { REACT_APP_ORIGIN } from "../../config";
import { ICustomCocktailBase, ICustomCocktailUpload } from "../../Interfaces";
import FormFeedback from "../Alert";
import Loading from "../Status/Loading";
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
  let initialState: ICustomCocktailUpload = {
    name: "",
    category: "Alcoholic",
    ingredients: [],
    instructions: [],
    imageName: "",
    imageFile: null,
  };
  const [cocktail, setCocktail] = useState(initialState);
  const {
    control,
    handleSubmit,
    clearErrors,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICustomCocktailUpload>({
    defaultValues: initialState,
    resolver: zodResolver(CocktailSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
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
    mutationFn: (data: ICustomCocktailBase) => {
      return api.post(
        "api/create-cocktail",
        { data },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": REACT_APP_ORIGIN,
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
      }, 7000);
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

  const onSubmit: SubmitHandler<ICustomCocktailUpload> = async () => {
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
                name="name"
                control={control}
                defaultValue={cocktail.name}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Cocktail Name"
                    value={value}
                    required
                    onChange={(event) => {
                      setCocktail({ ...cocktail, name: event.target.value });
                      onChange(event.target.value);
                    }}
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
                    required
                    onChange={(event) => {
                      setCocktail({
                        ...cocktail,
                        category: event.target.value as
                          | "Alcoholic"
                          | "Non-alcoholic",
                      });
                      onChange(event.target.value);
                    }}
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
                    required
                    value={value}
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setCocktail({ ...cocktail, ingredients: arr });
                      onChange(arr);
                    }}
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
                    required
                    label="Instructions"
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setCocktail({ ...cocktail, instructions: arr });
                      onChange(arr);
                    }}
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
                    name="imageFile"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <VisuallyHiddenInput
                        type="file"
                        name="imageFile"
                        onChange={(event) => {
                          if (event.target.files) {
                            setCocktail({
                              ...cocktail,
                              imageName: event.target.files[0].name,
                              imageFile: event.target.files[0],
                            });
                            onChange(event.target.files[0]);
                            setValue("imageName", event.target.files[0].name, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        accept=".png, .jpeg, .jpg, .webp"
                      />
                    )}
                  />
                </Button>
                <Typography variant="body1">
                  <span>File uploaded: </span>
                  <span style={{ wordBreak: "break-all", fontWeight: 600 }}>
                    {values.imageName}
                  </span>
                  <input
                    {...register("imageName", {
                      required: true,
                    })}
                    value={values.imageFile?.name}
                    type="hidden"
                  />
                </Typography>
              </Stack>
              {errors.imageName?.message && (
                <FormFeedback
                  message={errors.imageName?.message}
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
