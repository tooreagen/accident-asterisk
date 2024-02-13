import axios from "axios";

const PORT = 3001;
const HOST = "localhost";

const getAccidentList = async () => {
  const URL = `http://${HOST}:${PORT}/accidentcheck`;

  const response = (await axios.get(URL)).data;
  return response;
};

const getAdressesList = async (cityId = 0, streetId = 0) => {
  const URL = `http://${HOST}:${PORT}/adresses?cityid=${cityId}&streetid=${streetId}`;

  const response = (await axios.get(URL)).data;
  return response;
};

export { getAccidentList, getAdressesList };
