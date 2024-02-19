import { useEffect, useState } from "react";
import { getAccidentDelete, getAccidentList } from "../api/api";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { deadline, message } from "../data";
import IconButtonComponent from "../components/IconButtonComponent/IconButtonComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ActionButtonsWrapper } from "./AccidentListPage.styled";

const AccidentListPage = () => {
  const [accidentListState, setAccidentListState] = useState([]);
  const navigate = useNavigate();

  //при старті робимо запит до бекенду та отримуємо список аварій
  useEffect(() => {
    const fetchAccidentList = async () => {
      try {
        setAccidentListState(await getAccidentList());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAccidentList();
  }, []);

  useEffect(() => {
    console.log(accidentListState);
  }, [accidentListState]);

  //функція відкриває сторінку додавання аварії
  const handleAccidentAdd = () => {
    navigate("/accidentadd", { replace: true });
  };

  //функція пошуку повідомлення на основі id
  const findMessage = (array, id) => {
    return array.find((item) => {
      return item.id === id;
    }).message;
  };

  const handleDeleteAccident = async (id) => {
    console.log(id);

    try {
      const response = await getAccidentDelete(id);
      if (response.status === "OK") {
        console.log("Аварія видалена");
      } else {
        console.log("Помилка");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      setAccidentListState(await getAccidentList());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div>Список аварій</div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Точки</th>
            <th>Повідомлення</th>
            <th>Час відновлення</th>
            <th>Коментар</th>
            <th>Зв'язок з оператором</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {accidentListState.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.points.join(", ")}</td>
                <td>{findMessage(message, parseInt(item.message))}</td>
                <td>{findMessage(deadline, parseInt(item.deadline))}</td>
                <td>{item.comment}</td>
                <td>{item.operator_call === "true" ? "Так" : "Ні"}</td>
                <td>
                  <ActionButtonsWrapper>
                    <IconButtonComponent
                      icon={<DeleteIcon />}
                      color={"error"}
                      onClick={() => handleDeleteAccident(item.id)}
                    />
                    <IconButtonComponent icon={<EditIcon />} color={"primary"} />
                  </ActionButtonsWrapper>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        style={{ marginTop: 10 }}
        onClick={handleAccidentAdd}
      >
        Додати аварію
      </Button>
    </div>
  );
};

export default AccidentListPage;
