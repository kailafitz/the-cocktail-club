import React from "react";
import TextField from "@mui/material/TextField";
import { FormFieldInterface } from "../../Interfaces";
import PropTypes from "prop-types";

const FormField = (props: FormFieldInterface) => {
  return (
    <TextField
      name={props.label.toLowerCase().replace(" ", "")}
      label={props.label}
      variant="standard"
      color="primary"
      defaultValue={props.value}
      onChange={props.onChange}
    />
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormField;
