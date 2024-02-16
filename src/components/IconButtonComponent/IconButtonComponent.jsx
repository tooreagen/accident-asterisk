import IconButton from "@mui/material/IconButton";

const IconButtonComponent = ({ icon, color }) => {
  return (
    <IconButton aria-label="delete" color={color}>
      {icon}
    </IconButton>
  );
};

export default IconButtonComponent;
