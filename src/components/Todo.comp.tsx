import React from 'react';
export type TodoType = {
  _id: string;
  taskName: string;
  comment: string;
  date: string;
};
import * as moment from 'moment';

const Todo: React.FC<{data: TodoType}> = ({
  data: {_id, taskName, comment, date}
}) => {
  return (
    <div className='card w-96 bg-base-100 shadow-xl my-4'>
      <div className='card-body'>
        <h2 className='card-title'>{taskName}</h2>
        <p>
          comment: <i>{comment}</i>
        </p>
        <pre>{moment(date).format('lll')}</pre>
      </div>
    </div>
  );
};

export default Todo;
