import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";

const FormFeedback = ({
  severity,
  message,
}: {
  severity: AlertColor | undefined;
  message: string;
}) => {
  return (
    <Alert severity={severity} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

export default FormFeedback;
