import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAdressesList } from "../api/api";
import { AccidentAddPageStyled, AdressesListWrapper } from "./AccidentAddPage.styled";
import CheckableList from "../components/CheckableList/CheckableList";

const AccidentAddPage = () => {
  const navigate = useNavigate();
  const [cityes, setCityes] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [cityesChecked, setCityesChecked] = useState([]);
  const [streetsChecked, setStreetsChecked] = useState([]);

  //функція повернення на головну сторінку
  const handleMainPage = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    console.log("cityes", cityes);
  }, [cityes]);

  useEffect(() => {
    console.log("streets", streets);
  }, [streets]);

  useEffect(() => {
    console.log("buildings", buildings);
  }, [buildings]);

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
    console.log("Запит вулиць", cityesChecked);
    if (cityesChecked.length) {
      for (const cityId of cityesChecked) {
        const fetchStreetsList = async () => {
          try {
            const response = await getAdressesList(cityId);
            setStreets(response.streets);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchStreetsList();
      }
    } else {
      setStreets([]);
    }
  }, [cityesChecked]);

  //функція отримання списку будинків на основі id вулиці
  useEffect(() => {
    if (streetsChecked.length) {
      for (const streetId of streetsChecked) {
        const fetchBuildingsList = async () => {
          try {
            const response = await getAdressesList(0, streetId);
            setBuildings(response.buildings);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchBuildingsList();
      }
    } else {
      setBuildings([]);
    }
  }, [streetsChecked]);

  return (
    <AccidentAddPageStyled>
      <div>Додавання аварії</div>

      <AdressesListWrapper>
        {/* Міста */}
        {cityes.length ? (
          <CheckableList
            items={cityes}
            primaryField="cityname"
            onCheckedChange={(newChecked) => setCityesChecked(newChecked)}
          />
        ) : null}
        {/* Вулиці */}
        {streets.length ? (
          <CheckableList
            items={streets}
            itemPrefix={"cityname"}
            primaryField="streetname"
            onCheckedChange={(newChecked) => setStreetsChecked(newChecked)}
          />
        ) : null}
        {/* Будинки */}
        {buildings.length ? <CheckableList items={buildings} primaryField="buildnum" /> : null}
      </AdressesListWrapper>

      <div>
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
    </AccidentAddPageStyled>
  );
};

export default AccidentAddPage;
