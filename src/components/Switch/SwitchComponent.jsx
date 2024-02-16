import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const SwitchComponent = ({ label, onCheckedChange, checked }) => {
  const handleChange = (event) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value="top"
        control={<Switch color="primary" checked={checked} onChange={handleChange} />}
        label={label}
        labelPlacement="top"
      />
    </FormControl>
  );
};

export default SwitchComponent;
