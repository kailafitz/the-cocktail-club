import Alert from "@mui/material/Alert";
import * as React from "react";
import { AlertColor } from "@mui/material/Alert";
import PropTypes from "prop-types";
import { IFormFeedbackProps } from "../../Interfaces";

const FormFeedback: React.FC<IFormFeedbackProps> = ({
  severity,
  message,
  mb,
}: IFormFeedbackProps) => {
  return (
    <Alert variant="filled" severity={severity} sx={{ mb: mb ? 2 : 0 }}>
      {message}
    </Alert>
  );
};

FormFeedback.propTypes = {
  severity: PropTypes.oneOf(["error", "warning", "info", "success"])
    .isRequired as PropTypes.Validator<AlertColor>,
  message: PropTypes.string.isRequired,
  mb: PropTypes.bool,
};

export default FormFeedback;
