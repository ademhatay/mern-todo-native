import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Badge, Card } from 'react-native-paper'
import AddModal from './AddModal';

const Todo = ({ item, todos, setTodos }) => {
	const [modalVisible, setModalVisible] = useState(false);


	const deleteTodo = async (id) => {
		await fetch(`https://mern-stack-todo-backend.onrender.com/api/v1/todos/${id}`, {
			method: 'DELETE'
		});
		setTodos(todos.filter(todo => todo._id !== id));
	}


	return <>
		<View>
			<Card mode='outlined' style={{ marginVertical: 5 }}>
				<Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
					{
						!(item.completed) ? <Badge style={{ backgroundColor: 'red' }}>UnCompleted</Badge> : <Badge style={{ backgroundColor: 'green' }}>Completed</Badge>
					}
					<Text style={{ flex: 2, textAlign: 'center' }}>
						{item.text.length > 20 ? item.text.slice(0, 20) + "..." : item.text}
					</Text>
					<View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<Badge style={{ backgroundColor: 'green', width: 50 }}>Edit</Badge>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteTodo(item._id)}>
							<Badge style={{ backgroundColor: 'red', width: 50 }}>Delete</Badge>
						</TouchableOpacity>
					</View>
				</Card.Content>
			</Card>
		</View>
		<AddModal todos={todos} setTodos={setTodos} modalVisible={modalVisible} setModalVisible={setModalVisible}  item={item}/>
	</>
}

export default Todo

const styles = StyleSheet.create({})