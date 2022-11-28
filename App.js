import { StyleSheet, View, StatusBar, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AddTodo from './src/components/AddTodo';
import TodoList from './src/components/TodoList';

const { height } = Dimensions.get('window');

const App = () => {

	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchTodos = async () => {
		// try fetch data with loading
		try {
			const response = await fetch('https://mern-stack-todo-backend.onrender.com/api/v1/todos');
			const data = await response.json();
			setTodos(data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTodos();
	}, []);
	return <>
		{
			loading ? (<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>) : (<View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={{ flex: 1, paddingTop: height * 0.05 }}>
					<AddTodo todos={todos} setTodos={setTodos} />
				</View>
				<View style={{ flex: 2, justifyContent: 'center' }}>
					<TodoList todos={todos} setTodos={setTodos} />
				</View>

			</View>)

		}
	</>
}

export default App

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#eee',
	},
})