import IconButton from "@mui/material/IconButton";

const IconButtonComponent = ({ icon, color, onClick }) => {
  return (
    <IconButton aria-label="delete" color={color} onClick={onClick}>
      {icon}
    </IconButton>
  );
};

export default IconButtonComponent;
