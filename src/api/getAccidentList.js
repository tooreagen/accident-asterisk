import axios from "axios";

const getAccidentList = async () => {
  const PORT = 3001;
  const HOST = "localhost";
  const URL = `http://${HOST}:${PORT}/accidentcheck`;

  const response = (await axios.get(URL)).data;
  return response;
};

export default getAccidentList;
