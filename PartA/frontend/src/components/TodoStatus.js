import React, {useContext, useState} from 'react';
import {message, Spin, Switch} from "antd";
import {AppContext} from "../AppContextProvider";

export default function TodoStatus({item}) {
    const {updateTodo} = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    async function changeTodo(item) {
        item.status = !item.status;
        setLoading(true)
        const result = await updateTodo(item._id, item.description, item.deadline, item.status)
        setLoading(false)
        if (result) {
            message.success(`Update todo status successfully.`);
        } else {
            message.error(`Update todo status failed.`);
        }
    }

    return (<>
        Status: {isLoading ? <Spin tip="Loading..."/> :
        <Switch checkedChildren="Incomplete" unCheckedChildren="Completion" defaultChecked={item.status}
                onClick={() => changeTodo(item)}/>}
    </>);
}