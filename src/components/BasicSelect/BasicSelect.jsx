import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ items, caption, onItemSelect, itemSelected }) => {
  const handleChange = (event) => {
    if (onItemSelect) {
      onItemSelect(event.target.value);
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      <FormControl fullWidth>
        <InputLabel>{caption}</InputLabel>
        <Select value={itemSelected} onChange={handleChange}>
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.id + ". " + item.message}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
