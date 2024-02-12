import axios from "axios";

const PORT = 3001;
const HOST = "localhost";

const getAccidentList = async () => {
  const URL = `http://${HOST}:${PORT}/accidentcheck`;

  const response = (await axios.get(URL)).data;
  return response;
};

const getAdressesList = async (cityid = 0) => {
  const URL = `http://${HOST}:${PORT}/adresses?cityid=${cityid}`;

  const response = (await axios.get(URL)).data;
  return response;
};

export { getAccidentList, getAdressesList };
