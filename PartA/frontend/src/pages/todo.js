import React, {useContext} from 'react';
import TodoItems from "../components/TodoItems";
import {AppContext} from "../AppContextProvider";
import {Typography, Divider} from "antd";
import Loading from "../components/Loading";

export default function Todo() {
    const {todoListLoading} = useContext(AppContext);
    return (<div>
        <Typography.Title>ToDo List</Typography.Title>
        <Divider/>
        {todoListLoading ? <Loading/> : <TodoItems/>}
    </div>);
}