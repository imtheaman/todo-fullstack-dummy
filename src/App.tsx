import {useQuery} from '@tanstack/react-query';
import {getAllTodoCards, addTodoCard} from '../api/api';

function App() {
  const {isLoading, isError, data, error} = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodoCards
  });

  if (isLoading) return <div>Loading todos...</div>;
  if (isError) return error;
  console.log(data);
  return (
    <div>
      <h1>Todo Fullstack App</h1>
      <button>Add todo</button>
      <div>
        {data.map(({taskName, comment, date}) => <div>{taskName}, {comment}, {date}</div>)}
      </div>
    </div>
  );
}

export default App;
