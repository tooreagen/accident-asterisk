import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAdressesList } from "../api/api";
import { CheckableList, SelectedListItem } from "../components/CheckableList/CheckableList";
import {
  AccidentAddPageStyled,
  AdressesListWrapper,
  ButtonsWrapper,
  PageHeader,
} from "./AccidentAddPage.styled";

const AccidentAddPage = () => {
  const navigate = useNavigate();
  const [cityes, setCityes] = useState([]); //отримані міста
  const [streets, setStreets] = useState([]); //отримані вулиці
  const [buildings, setBuildings] = useState([]); //отримані будинки
  const [citySelect, setItemCityesSelect] = useState(0); //виділене місто
  const [streetSelect, setItemStreetsSelect] = useState(0); //виділена вулиця
  const [buildingsSelect, setBuildingsSelect] = useState([]); ////виділені будинки
  const [points, setPoints] = useState([]);

  //масив з ID міст, вулиць, будинків. На основі них отримамуватимо ID точки підключення
  const [addresses, setAddresses] = useState([]);

  //функція повернення на головну сторінку
  const handleMainPage = () => {
    navigate("/", { replace: true });
  };

  //функція бере значення citySelect, streetSelect, buildingsSelect
  //також дані по терміну аварії тексту повідомлення та можливості дзвінка оператору
  //та передає запит на бекенд
  const handlePointAdd = () => {
    // console.log(citySelect, streetSelect, buildingsSelect);
    // if (buildingsSelect.length) {
    //   buildingsSelect.map((building) => {
    //   });
    // }
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
    console.table(addresses);
  }, [addresses]);

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
  }, []);

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
          // onClick={}
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
    </AccidentAddPageStyled>
  );
};

export default AccidentAddPage;
