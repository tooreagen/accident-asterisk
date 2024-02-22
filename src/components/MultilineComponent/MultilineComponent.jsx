import TextField from "@mui/material/TextField";

const MultilineComponent = ({ label, onTextChange, value }) => {
  const handleChange = (event) => {
    if (onTextChange) {
      onTextChange(event.target.value);
    }
  };

  return (
    <TextField
      label={label}
      multiline
      rows={4}
      style={{ height: "100%" }}
      InputProps={{ style: { height: "100%" } }}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MultilineComponent;
