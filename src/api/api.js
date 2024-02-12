import axios from "axios";

const PORT = 3001;
const HOST = "localhost";

const getAccidentList = async () => {
  const URL = `http://${HOST}:${PORT}/accidentcheck`;

  const response = (await axios.get(URL)).data;
  return response;
};

const getAdressesList = async (cityId = 0) => {
  const URL = `http://${HOST}:${PORT}/adresses?cityid=${cityId}`;

  const response = (await axios.get(URL)).data;
  return response;
};

export { getAccidentList, getAdressesList };
