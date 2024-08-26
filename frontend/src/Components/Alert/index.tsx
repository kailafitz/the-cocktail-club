import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";

const FormFeedback = ({
  severity,
  message,
  mb,
}: {
  severity: AlertColor | undefined;
  message: string;
  mb?: boolean;
}) => {
  return (
    <Alert variant="filled" severity={severity} sx={{ mb: mb ? 2 : 0 }}>
      {message}
    </Alert>
  );
};

export default FormFeedback;
