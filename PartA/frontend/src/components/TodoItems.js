import React, {useContext} from 'react';
import {AppContext} from "../AppContextProvider";
import {Divider, List} from "antd";
import TodoStatus from "./TodoStatus";
import DelTodo from "./DelTodo";
import TodoDescription from "./TodoDescription";
import {TodoDeadline, TodoUpdateTime} from "./TodoDate";
import AddTodo from "./AddTodo";

export default function TodoItems() {
    const {todoList} = useContext(AppContext);
    return (<>
        <AddTodo/>
        <Divider/>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{pageSize: 3}}
            dataSource={todoList}
            renderItem={item => (<List.Item key={item.index}
                                            actions={[<DelTodo item={item}/>]}>
                <List.Item.Meta title={`Todo ID: ${item._id}`}
                                description={<TodoDescription item={item}/>}/>
                <List.Item.Meta description={<TodoStatus item={item}/>}/>
                <List.Item.Meta
                    description={<TodoDeadline item={item}/>}/>
                <List.Item.Meta
                    description={<TodoUpdateTime item={item}/>}/>
            </List.Item>)}
        />
    </>);
}