import React from 'react';
import {Alert, Space, Spin} from "antd";

export default function Loading() {
    return (
        <Space size="middle">
            <Spin size="large" tip="Loading..." delay={100}>
                <Alert type="info" showIcon
                       message="Loading data"
                       description="Data is being requested, please waiting..."
                />
            </Spin>
        </Space>
    )
}
