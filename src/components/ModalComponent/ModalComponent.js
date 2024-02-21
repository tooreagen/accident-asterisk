import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, handleClose, handleDelete, id }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Видалити аварію?
        </Typography>
        <div>
          <Button
            variant="contained"
            endIcon={<CheckCircleOutlineIcon />}
            style={{ marginTop: 10 }}
            color={"success"}
            onClick={() => {
              handleDelete(id);
              handleClose();
            }}
            sx={{ width: 100 }}
          >
            Так
          </Button>
          <Button
            variant="contained"
            endIcon={<HighlightOffIcon />}
            style={{ marginTop: 10 }}
            color={"error"}
            onClick={handleClose}
            sx={{ width: 100, marginLeft: 2 }}
          >
            Ні
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
