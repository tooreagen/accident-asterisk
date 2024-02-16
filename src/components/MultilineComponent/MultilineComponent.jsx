import TextField from "@mui/material/TextField";

const MultilineComponent = () => {
  return (
    <TextField
      label="Коментар"
      multiline
      rows={4}
    />
  );
};

export default MultilineComponent;
