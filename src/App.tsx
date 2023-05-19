import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getAllTodoCards, addTodoCard} from '../api/api';
import {useRef, useState} from 'react';
import Todo, {TodoType} from './components/Todo.comp';

function App() {
  const [taskName, setTaskName] = useState('');
  const [comment, setComment] = useState('');
  const modalRef = useRef<HTMLInputElement>(null);

  const {isLoading, isError, data, error} = useQuery<TodoType[]>({
    queryKey: ['todos'],
    queryFn: getAllTodoCards
  });

  const queryClient = useQueryClient();

  const todoMutate = useMutation({
    mutationFn: addTodoCard,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const handleAddTodo = () => {
    todoMutate.mutate({taskName, comment});
    modalRef.current!.checked = false;
    setTaskName('');
    setComment('');
  };

  return (
    <div>
      <div className='flex justify-around items-center my-4'>
        <h1 className='text-3xl font-bold'>Todo Fullstack App</h1>
        <label
          htmlFor='my-modal'
          className='btn'
        >
          Add todo
        </label>
      </div>
      <input
        type='checkbox'
        ref={modalRef}
        id='my-modal'
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add todo card</h3>
          <label className='label'>
            <span className='label-text'>Task Name</span>
            <input
              type='text'
              placeholder='Type here'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className='input w-full max-w-xs'
            />
          </label>
          <label className='label'>
            <span className='label-text'>Comment</span>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Type here'
              className='input w-full max-w-xs'
            />
          </label>
          <div className='modal-action'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={!(comment && taskName)}
              onClick={handleAddTodo}
            >
              Add
            </button>
            <label
              htmlFor='my-modal'
              className='btn'
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col-reverse justify-center items-center'>
        {isLoading ? (
          <div>Loading todos...</div>
        ) : isError ? (
          <pre>error</pre>
        ) : (
          data.map((obj) => (
            <Todo
              key={obj._id}
              data={obj}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
