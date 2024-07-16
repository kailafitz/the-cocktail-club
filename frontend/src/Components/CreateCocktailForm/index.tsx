import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { ICocktailCustom, ICocktailUpload } from "../../Interfaces";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import FormFeedback from "../Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [cocktail, setCocktail] = useState<ICocktailUpload>({
    id: 0,
    name: "",
    category: "Alcoholic",
    ingredients: [],
    instructions: [],
    image: null,
  });
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
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
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    onSuccess() {
      console.log("Success");
      setLoading(false);
      if (location.pathname === "/profile") {
        queryClient.invalidateQueries("Get Account Details");
      } else {
        queryClient.invalidateQueries("Get All Cocktails");
      }
      handleClose();
    },
    onError: (error: AxiosError) => {
      setLoading(false);
      if (
        typeof error.response?.data === "string" &&
        error.response?.data !== "Unauthorised"
      ) {
        setErrorMessage(error.response?.data);
      }
    },
  });

  const handleCreate = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    mutation.mutate(cocktail);
  };

  return (
    <>
      <Box>
        <Button
          variant="primaryDark"
          onClick={handleClickOpen}
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
          onSubmit={handleCreate}
          direction="column"
          spacing={4}
          alignSelf="center"
          p={5}
          sx={{ width: "-webkit-fill-available" }}
        >
          {mutation.isError && (
            <FormFeedback severity="error" message={errorMessage} />
          )}
          {loading ? (
            <Loading color="light" />
          ) : (
            <>
              <TextField
                label="Cocktail Name"
                onChange={(event) =>
                  setCocktail({ ...cocktail, name: event.target.value })
                }
              />
              <Select
                defaultValue="Alcoholic"
                onChange={(event) =>
                  setCocktail({
                    ...cocktail,
                    category: event.target.value as
                      | "Alcoholic"
                      | "Non-alcoholic",
                  })
                }
              >
                <MenuItem value="Alcoholic">Alcoholic</MenuItem>
                <MenuItem value="Non-alcoholic">Non-alcoholic</MenuItem>
              </Select>
              <TextField
                label="Ingredients"
                onChange={(event) => {
                  let arr = event.target.value.split(",");
                  setCocktail({ ...cocktail, ingredients: arr });
                }}
              />
              <TextField
                label="Instructions"
                onChange={(event) => {
                  let arr = event.target.value.split(",");
                  setCocktail({ ...cocktail, instructions: arr });
                }}
              />
              <Stack direction="row" spacing={3} alignItems="center">
                <Button
                  // disabled
                  component="label"
                  role={undefined}
                  variant="primaryDark"
                  tabIndex={-1}
                  fullWidth={false}
                >
                  <FileUploadIcon />
                  {/* Upload file */}
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    onChange={(event) =>
                      setCocktail({
                        ...cocktail,
                        image: event.target.files
                          ? event.target.files[0]
                          : null,
                      })
                    }
                  />
                </Button>
                <Typography variant="body1">
                  File uploaded:{" "}
                  {typeof cocktail.image === "object" && cocktail.image
                    ? cocktail.image.name
                    : null}
                </Typography>
              </Stack>
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
