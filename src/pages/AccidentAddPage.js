import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAdressesList,
  getConnectionPointById,
  getAccidentAdd,
  getConnectionPointForCity,
  getConnectionPointForStreet,
} from "../api/api";
import { CheckableList, SelectedListItem } from "../components/CheckableList/CheckableList";
import {
  AccidentAddPageStyled,
  AdressesListWrapper,
  ButtonsWrapper,
  Comment,
  Footer,
  OperatorSelector,
  PageHeader,
  SelectSection,
  SettingsContainer,
  SelectedListWrapper,
} from "./AccidentAddPage.styled";
import BasicSelect from "../components/BasicSelect/BasicSelect";
import { deadline, message } from "../data";
import SwitchComponent from "../components/Switch/SwitchComponent";
import MultilineComponent from "../components/MultilineComponent/MultilineComponent";
import PointsList from "../components/PiontsList/PiontsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../components/NotificationComponent/NotificationComponent";

const AccidentAddPage = () => {
  const navigate = useNavigate();
  const [cityes, setCityes] = useState([]); //отримані міста
  const [streets, setStreets] = useState([]); //отримані вулиці
  const [buildings, setBuildings] = useState([]); //отримані будинки
  const [citySelect, setItemCityesSelect] = useState(0); //виділене місто
  const [streetSelect, setItemStreetsSelect] = useState(0); //виділена вулиця
  const [buildingsSelect, setBuildingsSelect] = useState([]); ////виділені будинки
  const [messageSelect, setMessageSelect] = useState(1); //обране повідомлення про аварію
  const [deadlineSelect, setDeadlineSelect] = useState(1); //обране повідомлення про завершення аварії
  const [comment, setComment] = useState(""); //коментар для аварії
  const [operatorCall, setOperatorCall] = useState(true); //чи можна зателефонувати до оператора
  const [points, setPoints] = useState([]);

  //масив з ID міст, вулиць, будинків. На основі них отримамуватимо ID точки підключення
  const [addresses, setAddresses] = useState([]);

  //функція повернення на головну сторінку
  const handleMainPage = () => {
    navigate("/", { replace: true });
  };

  //функція отримання списку мість, вулиць, будинків
  const fetchData = async (objKey, setDataCallback, selectedCity, selectedStreet) => {
    try {
      const response = await getAdressesList(selectedCity, selectedStreet);
      setDataCallback(response[objKey]);
    } catch (error) {
      console.error("Error fetching data:", error);
      notifyError("Помилка роботи з БД");
    }
  };

  //функція додавання аварії
  const accidentAdd = async (ownPoint) => {
    const response = await getAccidentAdd(
      ownPoint,
      messageSelect,
      deadlineSelect,
      comment,
      operatorCall
    );

    if (response.status === "OK") {
      console.log("Аварія додана");
      //після додавання аварії повернемось на головну сторінку
      handleMainPage();
    } else {
      notifyError("Помилка роботи з БД");
    }
  };

  //функція додає до точок підключення -1, таким чином аварія по всій мережі
  const handlePointAddGlobalAccident = async () => {
    await accidentAdd([-1]);
  };

  //функція додає до точок підключення всі точки міста
  const handlePointAddAllCity = async () => {
    if (citySelect !== 0) {
      const responsePoints = await getConnectionPointForCity(citySelect);
      const addingPoints = responsePoints.points.map((item) => item.id);
      await accidentAdd(addingPoints);
    }
  };

  //функція додає до точок підключення всі точки вулиці
  const handlePointAddAllStreet = async () => {
    if (citySelect !== 0 && streetSelect !== 0) {
      const responsePointsRaw = await getConnectionPointForStreet(citySelect, streetSelect);
      const responsePoints = responsePointsRaw.points.map((item) => item.id);

      const mergedArrayPoints = Array.from(new Set(points.concat(responsePoints)));

      setPoints(mergedArrayPoints);

      setItemCityesSelect(0);
      setItemStreetsSelect(0);
      setBuildingsSelect([]);
      setStreets([]);
      setBuildings([]);

      fetchData("cityes", setCityes, 0);
    }
  };

  //1. функція бере значення addresses передає на бек та отримує точку підключення
  //2. додає до points точку, дані по терміну аварії, тексту повідомлення та можливості дзвінка оператору
  const handlePointAdd = async () => {
    //отримання точки підключення з бекенду
    if (addresses.length !== 0) {
      const newPoints = [];
      for (const address of addresses) {
        const { city_id, street_id, building_id } = address;
        try {
          const response = await getConnectionPointById(city_id, street_id, building_id);

          const isPointExists = points.some((point) => point === response.point_id);

          if (!isPointExists) {
            newPoints.push(response.point_id);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          notifyError("Деякі точки не знайдено");
        }
      }
      setPoints((prevPoints) => [...prevPoints, ...newPoints]);

      setItemCityesSelect(0);
      setItemStreetsSelect(0);
      setBuildingsSelect([]);
      setStreets([]);
      setBuildings([]);

      fetchData("cityes", setCityes, 0);
    }
  };

  //2. передає на бек точку, дані по терміну аварії, тексту повідомлення та можливості дзвінка оператору
  const handleAccidentAdd = async () => {
    await accidentAdd(points);
  };

  //при кожному клікі формуємо масив об'єктів в якому буде МІСТО ВУЛ БУД
  const handleBuildingsSelect = (buildingSelect, indexSelect) => {
    setBuildingsSelect(buildingSelect);

    const isDeleteElement = addresses.find((address) => address.building_id === indexSelect);

    if (isDeleteElement) {
      // Видалити елемент із addresses
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.building_id !== indexSelect)
      );
    }

    const addUpdatedAddresses = [];

    buildingSelect.forEach((building) => {
      const isBuildingExists = addresses.some((address) => address.building_id === building);

      if (!isBuildingExists) {
        addUpdatedAddresses.push({
          city_id: citySelect,
          street_id: streetSelect,
          building_id: building,
        });
      }
    });

    // Додати нові елементи в addresses
    setAddresses((prevAddresses) => [...prevAddresses, ...addUpdatedAddresses]);
  };

  //при старті робимо запит до бекенду та отримуємо список міст
  useEffect(() => {
    fetchData("cityes", setCityes, 0);
  }, []);

  //функція отримання списку вулиць на основі id міста
  useEffect(() => {
    setItemStreetsSelect(0);
    setBuildings([]);
    setAddresses([]);
    setBuildingsSelect([]);

    //отримання списку вулиць
    if (citySelect !== 0) {
      fetchData("streets", setStreets, citySelect);
    }
  }, [citySelect]);

  //функція отримання списку будинків на основі id вулиці
  useEffect(() => {
    if (streetSelect !== 0) {
      fetchData("buildings", setBuildings, 0, streetSelect);
    }
  }, [streetSelect]);

  return (
    <AccidentAddPageStyled>
      <PageHeader>Додавання аварії</PageHeader>

      <AdressesListWrapper>
        {/* Міста */}

        {cityes.length ? (
          <SelectedListWrapper>
            <p>Оберіть місто:</p>
            <SelectedListItem
              items={cityes}
              primaryField="cityname"
              onItemSelect={(newSelect) => setItemCityesSelect(newSelect)}
            />
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              style={{ width: 200 }}
              color="error"
              onClick={handlePointAddGlobalAccident}
            >
              АВАРІЯ ВСЮДИ
            </Button>
          </SelectedListWrapper>
        ) : null}

        {/* Вулиці */}
        {streets.length ? (
          <SelectedListWrapper>
            <p>Оберіть вулицю:</p>
            <SelectedListItem
              items={streets}
              itemPrefix={"cityname"}
              primaryField="streetname"
              onItemSelect={(newSelect) => setItemStreetsSelect(newSelect)}
            />
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              style={{ width: 200 }}
              color="warning"
              onClick={handlePointAddAllCity}
            >
              Все місто
            </Button>
          </SelectedListWrapper>
        ) : null}
        {/* Будинки */}
        {buildings.length ? (
          <SelectedListWrapper>
            <p>Оберіть будинки:</p>
            <CheckableList
              items={buildings}
              itemPrefix={"address"}
              primaryField="buildnum"
              onCheckedChange={(newSelect, indexSelect) =>
                handleBuildingsSelect(newSelect, indexSelect)
              }
            />
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              style={{ width: 200 }}
              color="warning"
              onClick={handlePointAddAllStreet}
            >
              Вся вулиця
            </Button>
          </SelectedListWrapper>
        ) : null}
        {points.length ? (
          <div>
            <p>Будуть додані точки:</p>
            <PointsList items={points} />
          </div>
        ) : null}
      </AdressesListWrapper>

      <Footer>
        <ButtonsWrapper>
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            style={{ width: 200 }}
            color="success"
            disabled={buildingsSelect.length ? false : true}
            onClick={handlePointAdd}
          >
            Додати точки
          </Button>

          <Button
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            style={{ width: 200 }}
            color="success"
            disabled={points.length ? false : true}
            onClick={handleAccidentAdd}
          >
            Додати аварію
          </Button>
          <Button
            variant="outlined"
            color="error"
            endIcon={<ArrowBackIcon />}
            style={{ width: 200 }}
            onClick={handleMainPage}
          >
            Назад
          </Button>
        </ButtonsWrapper>
        <SettingsContainer>
          <SelectSection>
            <BasicSelect
              items={message}
              caption={"Повідомлення"}
              onItemSelect={(newSelect) => setMessageSelect(newSelect)}
              itemSelected={messageSelect}
            />
            <BasicSelect
              items={deadline}
              caption={"Дедлайн"}
              onItemSelect={(newSelect) => setDeadlineSelect(newSelect)}
              itemSelected={deadlineSelect}
            />
          </SelectSection>
          <OperatorSelector>
            <SwitchComponent
              label={"Оператор?"}
              onCheckedChange={(checked) => setOperatorCall(checked)}
              checked={operatorCall}
            />
          </OperatorSelector>
          <Comment>
            <MultilineComponent
              label={"Коментар"}
              onTextChange={(text) => setComment(text)}
              value={comment}
            />
          </Comment>
        </SettingsContainer>
      </Footer>
      <ToastContainer />
    </AccidentAddPageStyled>
  );
};

export default AccidentAddPage;
