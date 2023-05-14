import { addSuggestions, queryNotices } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormDateRangePicker, ProFormSelect, ProFormText, ProFormTextArea, ProList } from '@ant-design/pro-components';
import { Button, Form, Tag, message } from 'antd';
import React, { useState } from 'react';


const fetchData = async (params: API.PageParams) => {
    const res = await queryNotices(params);
    // setPageInfo({ ...pageInfo, total: res.total });
    return { data: res.data.list, success: res.success, total: res.data.total };
};

const handleAdd = async (fields: API.SuggestionItem) => {
    const hide = message.loading('正在添加');
    try {
        await addSuggestions({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
}
export default () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const handleClick = () => {
        handleModalOpen(true);
    };
    return (
        <>
            <ProList<{ title: string }>
                toolBarRender={() => {
                    return [
                        <Button key="3" type="primary" onClick={handleClick}>
                            我要反馈
                        </Button>,
                    ];
                }}
                itemLayout="vertical"
                rowKey="id"
                headerTitle="通知栏"
                request={fetchData}
                metas={{
                    title: {},
                    description: {
                        render: (_, record) => (
                            <>
                                <Tag>{record?.userName}</Tag>
                                <Tag>{record?.createTime}</Tag>
                            </>
                        ),
                        // render: (_,record) => {
                        //     console.log(record); // 输出 record 对象到控制台
                        //     return null; // 返回 null，表示不显示具体的描述信息
                        // },
                    },
                    extra: {
                        render: () => (
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        ),
                    },
                    content: {
                        render: (_, record) => {
                            return (
                                <div>
                                    {record.content}
                                </div>
                            );
                        },
                    },
                }}
            />
            <ModalForm<{
                name: string;
                company: string;
            }>
                title="我要反馈"
                onOpenChange={handleModalOpen}

                open={createModalOpen}
                autoFocusFirstInput
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => console.log('run'),
                }}
                submitTimeout={2000}
                onFinish={
                    async (value) => {
                        console.log(value.content);
                        message.success('提交成功');
                        return true;
                    }
                }
            >
                <ProFormTextArea
                    name="content"
                    placeholder="请输入反馈内容"
                />
            </ModalForm>
        </>
    );
};