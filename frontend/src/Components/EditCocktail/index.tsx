import { zodResolver } from "@hookform/resolvers/zod";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../axios";
import {
  ICustomCocktailDownload,
  ICustomCocktailUpload,
} from "../../Interfaces";
import FormFeedback from "../Alert";
import { CocktailSchema } from "../CreateCocktailForm/Schema";
import Loading from "../Status/Loading";

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

const EditCocktail: React.FC<{ cocktail: ICustomCocktailDownload }> = ({
  cocktail,
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [updatedCocktail, setUpdatedCocktail] = useState<ICustomCocktailUpload>(
    {
      ...cocktail,
      imageFile: null,
    }
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
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
    defaultValues: {
      name: cocktail.name,
      category: cocktail.category,
      ingredients: cocktail.ingredients,
      instructions: cocktail.instructions,
      imageName: cocktail.imageName,
      imageFile: null,
    },
    resolver: zodResolver(CocktailSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleOpen = () => {
    reset();
    mutation.reset();
    setUpdatedCocktail(cocktail);
    clearErrors();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: ICustomCocktailUpload) => {
      return api.put(
        `api/cocktail/${cocktail.id}`,
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
      console.log("Cocktail updated successfully");
      setTimeout(() => {
        setLoading(false);
        queryClient.invalidateQueries("Get Cocktail Details");
        handleClose();
      }, 1500);
    },
    onError: (error: AxiosError) => {
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(
          typeof error.response?.data === "string"
            ? `${error.response?.data}`
            : ""
        );
      }, 1500);
    },
  });

  let values = getValues();

  // console.log("cocktail", cocktail);
  // console.log("values", values);
  // console.log("updatedCocktail", updatedCocktail);
  // console.log("errors", errors);

  const onSubmit: SubmitHandler<ICustomCocktailUpload> = async () => {
    setLoading(true);
    mutation.reset();
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
                rules={{ required: true }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Cocktail Name"
                    required
                    defaultValue={updatedCocktail.name}
                    onChange={(event) => {
                      onChange(event.target.value);
                      setUpdatedCocktail({
                        ...updatedCocktail,
                        name: event.target.value,
                      });
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    required
                    defaultValue={updatedCocktail.category}
                    onChange={(event) => {
                      setUpdatedCocktail({
                        ...updatedCocktail,
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
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <TextField
                    required
                    label="Ingredients"
                    defaultValue={updatedCocktail.ingredients}
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setUpdatedCocktail({
                        ...updatedCocktail,
                        ingredients: arr,
                      });
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    defaultValue={updatedCocktail.instructions}
                    label="Instructions"
                    onChange={(event) => {
                      let arr = event.target.value.split(",");
                      setUpdatedCocktail({
                        ...updatedCocktail,
                        instructions: arr,
                      });
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
                        name="image"
                        onChange={(event) => {
                          if (event.target.files) {
                            setUpdatedCocktail({
                              ...updatedCocktail,
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
                    hidden
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
  cocktail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }) as PropTypes.Validator<ICustomCocktailDownload>,
};

export default EditCocktail;
