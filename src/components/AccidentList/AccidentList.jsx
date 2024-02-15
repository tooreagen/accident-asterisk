import { useEffect, useState } from "react";
import { getAccidentList } from "../../api/api";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { deadline, message } from "../../data";

const AccidentList = () => {
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
                <td>{item.operator_call}</td>
                <td>
                  <button>Ред.</button>
                  <button>X</button>
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

export default AccidentList;
