import React, {useContext, useState} from 'react';
import {Input, message, Spin} from "antd";
import {AppContext} from "../AppContextProvider";

const {TextArea} = Input;

export default function TodoDescription({item}) {
    const [bordered, setBordered] = useState(false)
    const {updateTodo} = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    async function changeTodo(value) {
        // console.log('TodoDescription--->:', value)
        if (value !== item.description) {
            setLoading(true)
            const result = await updateTodo(item._id, value, item.deadline, item.status)
            setLoading(false)
            if (result) {
                message.success(`Update todo status successfully.`);
            } else {
                message.error(`Update todo status failed.`);
            }
        }
        setBordered(false)
    }

    return (<>
        Description:{isLoading ? <Spin tip="Loading..."/> : <TextArea size="large"
                                                     defaultValue={item.description}
                                                     bordered={bordered} onClick={() => setBordered(true)}
                                                     onBlur={(e) => changeTodo(e.target.value)}/>}
    </>);
}
