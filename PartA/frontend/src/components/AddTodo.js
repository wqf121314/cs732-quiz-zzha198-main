import React, {useContext, useState} from 'react';
import {Button, Form, Input, Modal, message, Space, DatePicker} from "antd";
import {AppContext} from "../AppContextProvider";
import Loading from "./Loading";

export default function AddTodo() {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [isLoading, setLoading] = useState(false);

    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const {addTodo} = useContext(AppContext);

    const handleOk = async () => {
        setConfirmLoading(true);
        // console.log('handleOk--->', description, deadline)
        if (description.length > 0 && deadline.length > 0) {
            setLoading(true)
            await addTodo(description, deadline);
            setLoading(false)
            message.success('Created todo successfully');
        } else {
            message.error('Created todo failed');
        }
        setVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    function onChangeTime(data, dateString) {
        setDeadline(dateString)
    }

    return (<>
        <Button type="primary" onClick={() => setVisible(true)}>
            Add Todo
        </Button>
        <Modal
            title="Add Todo"
            centered
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1000}
        >
            {isLoading ? <Loading/> : <>
                <Form.Item label="Description" name="description" rules={[{required: true}]}>
                    <Input onChange={(e) => setDescription(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Deadline" name="deadline" rules={[{required: true}]}>
                    <Space direction="vertical">
                        <DatePicker onChange={onChangeTime}/>
                    </Space>
                </Form.Item></>}
        </Modal>
    </>);
}
