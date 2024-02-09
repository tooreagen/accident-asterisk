import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AccidentAddPage = () => {
  const navigate = useNavigate();

  //функція відкриває сторінку додавання аварії
  const handleMainPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div>Додавання аварії</div>

      <Button
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        style={{ marginTop: 10 }}
        color="success"
        // onClick={}
      >
        Додати
      </Button>

      <Button
        variant="outlined"
        color="error"
        endIcon={<ArrowBackIcon />}
        style={{ marginTop: 10 }}
        onClick={handleMainPage}
      >
        Назад
      </Button>
    </div>
  );
};

export default AccidentAddPage;
