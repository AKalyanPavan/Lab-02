import * as React from 'react';

import TodoApp from './screens/TodoApp';

import { addTodo, deleteTodo } from './redux/actions';

// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';

import { firebaseConfig, tasksRef, database, ref, onValue } from './components/FireBase.js';

const App = () => {

  const [todoList, setTodoList] = React.useState([]);
  var id = 0;

  React.useEffect(() => {
    const unsubscribe = onValue(tasksRef, (snapshot) => {

      const data = snapshot.val();
      const newTodoList = [];

      for (const taskId in data) {
        if (data.hasOwnProperty(taskId)) {
          const task = data[taskId];
          const taskObj = {
            id: id,
            firebaseId: taskId,
            task: task.name
          };
          newTodoList.push(taskObj);
          id++;
        }
      }

      setTodoList(newTodoList);

    });

    return () => unsubscribe();

  }, []);


  return (
    <Provider store={store}>
      <TodoApp todoList={todoList}/>
    </Provider>
  );
}

export default App;