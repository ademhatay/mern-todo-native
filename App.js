import { StyleSheet, View, StatusBar, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import AddTodo from './src/components/AddTodo';
import TodoList from './src/components/TodoList';

const { height } = Dimensions.get('window');

const App = () => {

	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const response = await fetch('https://mern-stack-todo-backend.onrender.com/api/v1/todos');
		const json = await response.json();
		setTodos(json.data);
	}

	useEffect(() => {
		fetchTodos();
	}, []);
	return <>
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<View style={{ flex: 1, paddingTop: height * 0.05 }}>
				<AddTodo todos={todos} setTodos={setTodos} />
			</View>
			<View style={{ flex: 2, justifyContent: 'center' }}>
				<TodoList todos={todos} setTodos={setTodos} />
			</View>

		</View>
	</>
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#eee',
	},
})