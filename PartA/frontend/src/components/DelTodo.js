import React, {useContext, useState} from 'react';
import {Button, message, Spin} from "antd";
import {AppContext} from "../AppContextProvider";

function DelTodo({item}) {
    const {delTodo} = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    async function deleteTodo(item) {
        // console.log(item)
        setLoading(true)
        const result = await delTodo(item._id);
        setLoading(false)
        if (result) {
            message.success(`Delete todo successfully. ID:${item._id} `);
        } else {
            message.error(`Delete todo failed.  ID:${item._id}`);
        }
    }

    return (
        // <a key="delete" onClick={() => deleteTodo(item)}>Delete</a>);
        <>
            {isLoading ? <Spin tip="Loading..."/> : <Button type="primary" onClick={() => deleteTodo(item)} danger> Delete</Button>}
        </>

    );
}

export default DelTodo;