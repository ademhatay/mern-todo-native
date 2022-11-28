import React, { useState } from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import { Button, Card, TextInput, Switch } from "react-native-paper";


const AddModal = ({ modalVisible, setModalVisible, item, todos, setTodos }) => {

	const [text, setText] = useState(item.text);

	const [completed, setCompleted] = useState(item.completed);

	const updateHandler = async (id) => {
		await fetch(`https://mern-stack-todo-backend.onrender.com/api/v1/todos/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text, completed })
		});
		setTodos(todos.map(todo => todo._id === id ? { ...todo, text, completed } : todo));
		setModalVisible(false);
	}

	const setNewText = (newText) => {
		setText(newText);
	}

	return <>
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>İD = {item._id}</Text>
						<Card style={{ width: "100%" }}>
							<Card.Title title="Update Todo" />
							<Card.Content>
								<TextInput
									onChangeText={newText => setNewText(newText)}
									label="Edit Todo"
									mode="outlined"
									value={text}
								/>
								<View style={{ justifyContent: "center", alignContent: "center" }}>
									<Text>Completed</Text>
									<Switch value={completed} onValueChange={() => setCompleted(!completed)} />
								</View>
							</Card.Content>

						</Card>
						<Card.Actions>
							<Button onPress={() => setModalVisible(false)} >Cancel</Button>
							<Button onPress={() => updateHandler(item._id)}>Save</Button>
						</Card.Actions>
					</View>
				</View>
			</Modal>
		</View >
	</>
}

export default AddModal

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	modalView: {
		justifyContent: "space-evenly",
		width: '80%',
		height: '50%',
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});
