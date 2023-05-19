const api_url = 'http://localhost:2000';

const addTodoCard = async (taskName, comment) => {
  const data = await fetch(`${api_url}/addtodocard`, {
    method: 'POST',
    body: JSON.stringify({
      taskName,
      comment
    })
  }).then((res) => res.json());
  return data;
};

const getAllTodoCards = async () => {
  const data = await fetch(`${api_url}/getalltodocards`).then((res) =>
    res.json()
  );
  return data;
};

export default {getAllTodoCards, addTodoCard};
