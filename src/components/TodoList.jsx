import { FlatList, Dimensions } from 'react-native'
import React from 'react'
import { Card, Title } from 'react-native-paper';
import Todo from './Todo';

const { width } = Dimensions.get('window');

const TodoList = ({todos, setTodos}) => {
	const renderItem = ({ item }) => {
		return (<Todo item={item} todos={todos} setTodos={setTodos}  />)
	};


	return <>
		<Card style={{ width: width - 30, height: "90%", overflow: 'hidden', paddingBottom: 10 }}>
			<Card.Content>
				<Title style={{ textAlign: 'center' }}>Todos</Title>
				<FlatList
				style={{overflow: 'scroll'}}
					data={todos}
					renderItem={renderItem}
					keyExtractor={(item) => item._id}
				/>
			</Card.Content>
		</Card>
	</>
}

export default TodoList

