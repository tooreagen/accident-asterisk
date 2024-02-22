import { List, ListItemText } from "@mui/material";

const PointsList = ({ items }) => {
  return (
    <>
      <List
        sx={{
          maxHeight: 500,
          minWidth: 200,
          width: 245,
          marginTop: "10px",
          padding: 1,
          position: "relative",
          overflow: "auto",
          bgcolor: "background.paper",
          display: "inline-block",
        }}
      >
        {items.map((value) => {
          return <ListItemText key={value} id={value} primary={value} />;
        })}
      </List>
    </>
  );
};

export default PointsList;
