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
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (id) => () => {
    const newChecked = [...checkedItems];

    if (newChecked.includes(id)) {
      // Элемент уже был отмечен, убираем отметку
      newChecked.splice(newChecked.indexOf(id), 1);
    } else {
      // Элемент не был отмечен, добавляем отметку
      newChecked.push(id);
    }

    setCheckedItems(newChecked);

    if (onCheckedChange) {
      onCheckedChange(newChecked, id);
    }
  };

  return (
    <List
      sx={{
        maxHeight: 500,
        width: 245,
        marginTop: "10px",
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
                  checked={checkedItems.includes(value.id)}
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
          maxHeight: 400,
          minWidth: 200,
          width: 245,
          marginTop: "10px",
          position: "relative",
          overflow: "auto",
          bgcolor: "background.paper",
          display: "inline-block",
          borderRadius: "5px"
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
