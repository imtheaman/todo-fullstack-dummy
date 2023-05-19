import axios from 'axios';
const api_url = 'http://localhost:2000';
type Params = {taskName: string; comment: string};

export const addTodoCard = async (param: Params) => {
  // fetch(`${api_url}/addtodocard`, {
  //   method: 'POST',
  //   mode: 'no-cors',
  //   credentials: 'same-origin',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(param)
  // });
  axios.post(`${api_url}/addtodocard`, param, {
    
  });
};

export const getAllTodoCards = async () => {
  const data = await fetch(`${api_url}/getalltodocards`).then((res) =>
    res.json()
  );
  return data;
};
