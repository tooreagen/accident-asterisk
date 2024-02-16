import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAdressesList, getConnectionPointById, getAccidentAdd } from "../api/api";
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
} from "./AccidentAddPage.styled";
import BasicSelect from "../components/BasicSelect/BasicSelect";
import { deadline, message } from "../data";
import SwitchComponent from "../components/Switch/SwitchComponent";
import MultilineComponent from "../components/MultilineComponent/MultilineComponent";

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
        }
      }
      setPoints((prevPoints) => [...prevPoints, ...newPoints]);

      setItemCityesSelect(0);
      setItemStreetsSelect(0);
      setBuildingsSelect([]);
      setCityes([]);
      setStreets([]);
      setBuildings([]);
    }
  };

  //2. передає на бек точку, дані по терміну аварії, тексту повідомлення та можливості дзвінка оператору
  const handleAccidentAdd = async () => {
    const response = await getAccidentAdd(
      points,
      messageSelect,
      deadlineSelect,
      comment,
      operatorCall
    );
    if (response.status === "OK") {
      console.log("Аварія додана");
      setMessageSelect(1);
      setDeadlineSelect(1);
      setComment("");
      setOperatorCall(true);
      setPoints([]);
    } else {
      console.log("Помилка");
    }
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

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  //при старті робимо запит до бекенду та отримуємо список міст
  useEffect(() => {
    const fetchAdressesList = async () => {
      try {
        const response = await getAdressesList();
        setCityes(response.cityes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdressesList();
  }, [cityes]);

  //функція отримання списку вулиць на основі id міст
  useEffect(() => {
    setItemStreetsSelect(0);
    setBuildings([]);
    setAddresses([]);
    setBuildingsSelect([]);

    if (citySelect !== 0) {
      const fetchStreetsList = async () => {
        try {
          const response = await getAdressesList(citySelect);
          setStreets(response.streets);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchStreetsList();
    }
  }, [citySelect]);

  //функція отримання списку будинків на основі id вулиці
  useEffect(() => {
    if (streetSelect !== 0) {
      const fetchBuildingsList = async () => {
        try {
          const response = await getAdressesList(0, streetSelect);
          setBuildings(response.buildings);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchBuildingsList();
    }
  }, [streetSelect]);

  return (
    <AccidentAddPageStyled>
      <PageHeader>Додавання аварії</PageHeader>

      <AdressesListWrapper>
        {/* Міста */}
        {cityes.length ? (
          <SelectedListItem
            items={cityes}
            primaryField="cityname"
            onItemSelect={(newSelect) => setItemCityesSelect(newSelect)}
          />
        ) : null}

        {/* Вулиці */}
        {streets.length ? (
          <SelectedListItem
            items={streets}
            itemPrefix={"cityname"}
            primaryField="streetname"
            onItemSelect={(newSelect) => setItemStreetsSelect(newSelect)}
          />
        ) : null}
        {/* Будинки */}
        {buildings.length ? (
          <CheckableList
            items={buildings}
            itemPrefix={"address"}
            primaryField="buildnum"
            onCheckedChange={(newSelect, indexSelect) =>
              handleBuildingsSelect(newSelect, indexSelect)
            }
          />
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
    </AccidentAddPageStyled>
  );
};

export default AccidentAddPage;
