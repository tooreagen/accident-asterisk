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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  notifySuccess,
  notifyError,
} from "../components/NotificationComponent/NotificationComponent";
import ModalComponent from "../components/ModalComponent/ModalComponent";
import { Container } from "../components/GlobalStyle";
import { PageHeader } from "./AccidentAddPage.styled";
import SimpleBackdrop from "../components/Backdrop/Backdrop";

const AccidentListPage = () => {
  const [accidentListState, setAccidentListState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [accidentId, setAccidentId] = useState(0); //id аварії яку передаємо в модалку для підтвердження видалення
  const navigate = useNavigate();

  const handleOpenModal = (id) => {
    setAccidentId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //при старті робимо запит до бекенду та отримуємо список аварій
  useEffect(() => {
    const fetchAccidentList = async () => {
      try {
        setIsBackdropOpen(true);
        setAccidentListState(await getAccidentList());
        setIsBackdropOpen(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsBackdropOpen(false);
        notifyError("Помилка роботи з БД");
      }
    };

    fetchAccidentList();
  }, []);

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
    try {
      setIsBackdropOpen(true);
      const response = await getAccidentDelete(id);
      if (response.status === "OK") {
        notifySuccess("Аварія видалена");
      } else {
        notifyError("Помилка");
      }
      setIsBackdropOpen(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsBackdropOpen(false);
      notifyError("Помилка роботи з БД");
    }

    try {
      setIsBackdropOpen(true);
      setAccidentListState(await getAccidentList());
      setIsBackdropOpen(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsBackdropOpen(false);
      notifyError("Помилка роботи з БД");
    }
  };

  return (
    <>
      <PageHeader>Список аварій</PageHeader>
      <Container>
        <div>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Час</th>
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
                    <td>{item.time}</td>
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
                          onClick={() => handleOpenModal(item.id)}
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
          <ToastContainer />
          <ModalComponent
            open={isModalOpen}
            handleClose={handleCloseModal}
            handleDelete={handleDeleteAccident}
            id={accidentId}
          />
        </div>
        <SimpleBackdrop open={isBackdropOpen} />
      </Container>
    </>
  );
};

export default AccidentListPage;
