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

const getConnectionPointById = async (city_id, street_id, build_id) => {
  const URL = `http://${HOST}:${PORT}/connpointbyid?city_id=${city_id}&street_id=${street_id}&build_id=${build_id}`;

  const response = (await axios.get(URL)).data;
  return response;
};

const getAccidentAdd = async (points, message, deadline, comment, operator_call) => {
  const URL = `http://${HOST}:${PORT}/accidentadd?points=${points}&message=${message}&deadline=${deadline}&comment=${comment}&operator_call=${operator_call}`;

  const response = (await axios.get(URL)).data;
  return response;
};

const getAccidentDelete = async (id) => {
  const URL = `http://${HOST}:${PORT}/accidentdelete?id=${id}`;

  const response = (await axios.get(URL)).data;
  return response;
};

export {
  getAccidentList,
  getAdressesList,
  getConnectionPointById,
  getAccidentAdd,
  getAccidentDelete,
};
