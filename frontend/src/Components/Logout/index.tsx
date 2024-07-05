import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import FormFeedback from "../Alert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Logout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(
        "api/logout",
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(res) {
      console.log("Redirect", res.data);
      navigate("/login");
      queryClient.invalidateQueries("authenticationStatus");
    },
    onError: (error: AxiosError) => {
      console.log("Logout error", error);
      // setErrorMessage(
      //   typeof error.response?.data === "string"
      //     ? `${error.response?.data}`
      //     : ""
      // );
    },
  });

  const handleLogout = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      {/* {mutation.isError && (
        <FormFeedback severity="error" message={errorMessage} />
      )} */}
      <Button variant="primary" type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
