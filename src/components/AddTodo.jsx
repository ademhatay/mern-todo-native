import { StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Title, TextInput, Button } from 'react-native-paper';

const { width } = Dimensions.get('window');


const AddTodo = ({ todos, setTodos }) => {

	const [text, setText] = useState('');

	// save todo to db and update state
	const saveTodo = async (e) => {
		e.preventDefault();
		if (text === '') return;
		const response = await fetch("https://mern-stack-todo-backend.onrender.com/api/v1/todos", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text, completed: false })
		});
		const data = await response.json();
		setTodos([...todos, data.data]);
		setText('');
	}
	


	return <>
		<Card style={{ width: width - 30 }}>
			<Card.Content>
				<Title style={{ textAlign: 'center' }}>Add Todo</Title>
				<TextInput
					label="Todo"
					onChangeText={newText => setText(newText)}
					value={text}
					defaultValue={text}
					mode='outlined'
				/>
				<Button style={{ marginTop: 20 }} mode="contained" onPress={saveTodo} >
					Save Todo
				</Button>
			</Card.Content>
		</Card>
	</>
}

export default AddTodo

const styles = StyleSheet.create({})