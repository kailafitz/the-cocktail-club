import React, { useState } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import FormFeedback from "../Alert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { api } from "../../axios";
import PropTypes from "prop-types";
import { ILogout } from "../../Interfaces";
import { Dialog } from "@mui/material";
import Loading from "../Status/Loading";

const Logout = (props: ILogout) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      // console.log("Redirect", res.data);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
        queryClient.invalidateQueries("Authentication Status Check");
      }, 2000);
    },
    onError: (error: AxiosError) => {
      console.log("Logout error", error);
      setTimeout(() => {
        setErrorMessage(
          typeof error.response?.data === "string"
            ? `${error.response?.data}`
            : ""
        );
      }, 2000);
    },
  });

  const handleLogout = (e: any) => {
    setLoading(true);
    e.preventDefault();
    mutation.reset();
    mutation.mutate();
  };

  return (
    <>
      {mutation.isError && (
        <Dialog
          open={errorMessage !== "" ? true : false}
          onClose={() => {
            setErrorMessage("");
          }}
        >
          <FormFeedback severity="error" message={errorMessage} />
        </Dialog>
      )}
      {loading && (
        <Dialog open={loading ? true : false}>
          <Loading color="light" />
        </Dialog>
      )}
      <Button
        variant="primaryLight"
        sx={{
          width: "100%",
        }}
        type="submit"
        onClick={(e) => {
          handleLogout(e);
          props.onClick(false);
        }}
      >
        Logout
      </Button>
    </>
  );
};

Logout.propTypes = {
  onClick: PropTypes.func,
};

export default Logout;
