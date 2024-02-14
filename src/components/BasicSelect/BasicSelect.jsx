import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const BasicSelect = ({ items, caption, onItemSelect }) => {
  const [selectIndex, setSelectIndex] = useState(1);

  const handleChange = (event) => {
    setSelectIndex(event.target.value);

    if (onItemSelect) {
      onItemSelect(event.target.value);
    }
  };

  return (
    <Box sx={{ width: 800 }}>
      <FormControl fullWidth>
        <InputLabel>{caption}</InputLabel>
        <Select value={selectIndex} onChange={handleChange}>
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
