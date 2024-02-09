import { useEffect, useState } from "react";
import getAccidentList from "../../api/getAccidentList";

const AccidentList = () => {
  const [accidentListState, setAccidentListState] = useState([]);

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
              <tr>
                <td>{item.id}</td>
                <td>{item.points.join(", ")}</td>
                <td>{item.message}</td>
                <td>{item.deadline}</td>
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
    </div>
  );
};

export default AccidentList;
