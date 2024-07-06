import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { CocktailCustomInterface } from "../../Interfaces";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import FormFeedback from "../Alert";
import FormField from "../TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { api } from "../../axios";

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
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [cocktail, setCocktail] = useState<CocktailCustomInterface>({
    id: 0,
    name: "",
    category: "Alcoholic",
    ingredients: [],
    instructions: [],
  });

  const mutation = useMutation({
    mutationFn: (data: CocktailCustomInterface) => {
      return api.post(
        "api/create-cocktail",
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
      console.log("Success");
      navigate("/my-cocktails");
    },
    onError: (error: AxiosError) => {
      if (
        typeof error.response?.data === "string" &&
        error.response?.data !== "Unauthorised"
      ) {
        setErrorMessage(error.response?.data);
      }
      navigate("/login");
    },
  });

  const handleCreate = async (event: any) => {
    event.preventDefault();
    mutation.mutate(cocktail);
  };

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleCreate}
      direction="column"
      spacing={4}
      width={{ xs: "100%", md: "40%" }}
      alignSelf="center"
    >
      {mutation.isError && (
        <FormFeedback severity="error" message={errorMessage} />
      )}
      <FormField
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
            category: event.target.value as "Alcoholic" | "Non-alcoholic",
          })
        }
      >
        <MenuItem value="Alcoholic">Alcoholic</MenuItem>
        <MenuItem value="Non-alcoholic">Non-alcoholic</MenuItem>
      </Select>
      <FormField
        label="Ingredients"
        onChange={(event) => {
          let arr = event.target.value.split(",");
          setCocktail({ ...cocktail, ingredients: arr });
        }}
      />
      <FormField
        label="Instructions"
        onChange={(event) => {
          let arr = event.target.value.split(",");
          setCocktail({ ...cocktail, instructions: arr });
        }}
      />
      <Button
        component="label"
        role={undefined}
        variant="primary"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <Button variant="primary" type="submit">
        Add Cocktail
      </Button>
    </Stack>
  );
};

export default CreateCocktailForm;
