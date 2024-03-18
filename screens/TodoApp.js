import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, push, onValue } from "firebase/database";

import { firebaseConfig, tasksRef, push, database, remove, ref } from '../components/FireBase.js';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo, todoList }) => {

  console.log("This is from todo");
  console.log(todoList);

  const [task, setTask] = React.useState('');

  todo_list = todoList;

  const handleAddTodo = () => {
    let taskObj = {
      name: task
    };

    addNewTask(taskObj);

    addTodo(task);
    setTask('');
    console.log(todo_list)
  }

  async function addNewTask(taskObj) {

    try {
      const newTaskRef = await push(tasksRef, taskObj);
      console.log("Data added successfully, key:", newTaskRef.key);
    } catch (error) {
      console.error("Error while adding data:", error.message);
    }

  }

  const handleDeleteTodo = (id, firebaseId) => {

    var url = firebaseConfig.databaseURL;
    url = url.replace(/\./g, '1');
    const taskRefRecord = ref(database, '/tasks/' + firebaseId);

    console.log(taskRefRecord);

    remove(taskRefRecord).then(() => {
      console.log("Record deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting record:", error.message);
    });

    deleteTodo(id)
  }

  const openEditTask = (task) => {
    console.log(task);
    setTask(task.task);
  }

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
            <Card onPress={() => openEditTask(item)} >
              <Card.Title
                title={`Task#${item.id}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id, item.firebaseId)} />}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
              </Card.Content>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: ownProps.todoList,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
