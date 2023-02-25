import React, {useContext, useState} from 'react';
import moment from 'moment';
import {DatePicker, message, Spin} from "antd";
import {AppContext} from "../AppContextProvider";

export function TodoDeadline({item}) {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const {updateTodo} = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    async function changeTodo(date, dateString) {
        if (dateString !== item.deadline) {
            setLoading(true)
            const result = await updateTodo(item._id, item.description, dateString, item.status)
            setLoading(false)
            if (result) {
                message.success(`Update todo deadline successfully.`);
            } else {
                message.error(`Update todo deadline failed.`);
            }
        }
    }

    return (
        <>
            Deadline:
            {isLoading ? <Spin tip="Loading..."/> : <DatePicker defaultValue={moment(item.deadline, dateFormat)} format={dateFormat}
                                               bordered={false} onChange={changeTodo}/>}
        </>
    );
}

export function TodoUpdateTime({item}) {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
        <>
            UpdateTime:<DatePicker defaultValue={moment(item.updatedAt, dateFormat)} format={dateFormat}
                                   bordered={false} disabled={true}/>
        </>
    );
}