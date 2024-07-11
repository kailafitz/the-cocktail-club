import React, { Dispatch, SetStateAction, useState } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import FormFeedback from "../Alert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { api } from "../../axios";

const Logout = ({
  onClick,
}: {
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");
  const mutation = useMutation({
    mutationFn: () => {
      return api.post(
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
      queryClient.invalidateQueries("Authentication Status Check");
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
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          handleLogout(e);
          onClick(false);
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
