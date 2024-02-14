import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

import { useState } from "react";

export const CheckableList = ({ items, itemPrefix, primaryField, onCheckedChange }) => {
  const [checkedItem, setCheckedItem] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedItem.indexOf(value);
    const newChecked = [...checkedItem];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItem(newChecked);

    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <List
      sx={{
        maxHeight: 500,
        position: "relative",
        overflow: "auto",
        bgcolor: "background.paper",
        display: "inline-block",
      }}
    >
      {items.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;
        return (
          <ListItem key={value.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value.id)}
              dense
              sx={{ width: "auto" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedItem.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  value[itemPrefix]
                    ? `${value[itemPrefix]}, ${value[primaryField]}`
                    : value[primaryField]
                }
                sx={{ flex: "0 1 auto", width: "auto" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export const SelectedListItem = ({ items, itemPrefix, primaryField, onItemSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (onItemSelect) {
      onItemSelect(index);
    }
  };

  return (
    <>
      <List
        sx={{
          maxHeight: 500,
          minWidth: 200,
          position: "relative",
          overflow: "auto",
          bgcolor: "background.paper",
          display: "inline-block",
        }}
      >
        {items.map((value) => {
          return (
            <ListItemButton
              selected={selectedIndex === value.id}
              key={value.id}
              onClick={(event) => handleListItemClick(event, value.id)}
            >
              <ListItemText
                id={value.id}
                primary={
                  value[itemPrefix]
                    ? `${value[itemPrefix]}, ${value[primaryField]}`
                    : value[primaryField]
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};
