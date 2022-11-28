import { FlatList, Dimensions, ActivityIndicator, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Card, Badge, Button } from 'react-native-paper';
import Todo from './Todo';

const { width } = Dimensions.get('window');

const TodoList = ({ todos, setTodos }) => {

	const [loading, setLoading] = useState(false);

	const renderItem = ({ item }) => {
		return (<Todo item={item} todos={todos} setTodos={setTodos} />)
	};
	const syncTodos = async () => {
		// try fetch data with loading
		try {
			setLoading(true);
			const response = await fetch('https://mern-stack-todo-backend.onrender.com/api/v1/todos');
			const data = await response.json();
			setTodos(data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}


	return <>
		{
			loading ? (<View style={styles.loading}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>) : (<Card style={{ width: width - 30, height: "90%", overflow: 'hidden', paddingBottom: 10 }}>
				<Card.Content>
					<Card.Title
						title="Todos"
						style={{ textAlign: 'center' }}
						left={() => <Badge style={{}}>{todos.length}</Badge>}
						right={() => <Button mode='outlined' onPress={syncTodos} >sync</Button>}
					/>
					<FlatList
						style={{ overflow: 'scroll' }}
						data={todos}
						renderItem={renderItem}
						keyExtractor={(item) => item._id}
					/>
				</Card.Content>
			</Card>)
		}
	</>
}

export default TodoList

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

