
import { addNotices, updateNotices } from '@/services/ant-design-pro/api';
import { deleteNotices, queryNotices } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProColumns, ProFormGroup, ProFormSelect, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const handleRemove = async (selectedRow: API.NoticeItem) => {
    const hide = message.loading('正在删除');
    if (!selectedRow) return true;
    try {
        await deleteNotices(selectedRow?.id ?? "");
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};
const handleUpdate = async (fields: API.NoticeItem) => {
    const hide = message.loading('Configuring');
    try {
        await updateNotices(fields.id ?? "", { ...fields });
        hide();

        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};
const handleAdd = async (fields: API.NoticeItem) => {
    const hide = message.loading('正在添加');
    try {
        await addNotices({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};
const ManageSuggest: React.FC = () => {

    const [currentRow, setCurrentRow] = useState<API.NoticeItem>();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();
    const columns: ProColumns<API.NoticeItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-notice.table.noticeTitle" />,
            dataIndex: 'title',
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-notice.table.noticeContent"
            />,
            dataIndex: 'content',
            valueType: 'textarea',
        },

        {
            title: <FormattedMessage id="pages.admin.manage-notice.table.noticeUser" />,
            dataIndex: 'username',
            valueType: 'textarea',
            hideInForm: true,
        },
        {
            title: <FormattedMessage id="pages.admin.manage-notice.table.noticeStatus" />,
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-notice.table.noticeStatus.unpublished"
                        />
                    ),
                    status: 'Default',
                },
                1: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-notice.table.noticeStatus.published"
                        />
                    ),
                    status: 'Success',
                },
            },
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-notice.table.noticeTime"
            />,
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-notice.table.action" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        setCurrentRow(record);
                        handleModalOpen(true);
                    }}
                >
                    <FormattedMessage id="pages.admin.manage-notice.table.action.edit" />
                </a>,
                <a key="subscribeAlert"
                    onClick={async () => {
                        const success = await handleRemove(record)
                        if (success) {
                            if (actionRef.current) {
                                actionRef.current.reload()
                            }
                        }
                    }}
                >
                    <FormattedMessage
                        id="pages.admin.manage-notice.table.action.delete"
                        defaultMessage="删除"
                    />
                </a>,
                <a key="stop"
                    onClick={async () => {
                        const success = await handleUpdate(record)
                        if (success) {
                            if (actionRef.current) {
                                actionRef.current.reload()
                            }
                        }
                    }}
                >
                    {
                        record.status == "0" ?
                            <FormattedMessage
                                id="pages.admin.manage-notice.table.action.stop"
                                defaultMessage="停用"
                            />:
                            <FormattedMessage
                                id="pages.admin.manage-notice.table.action.start"
                                defaultMessage="启用"
                            />
                    }

                </a>,

            ],
        },
    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await queryNotices(params);
        // setPageInfo({ ...pageInfo, total: res.total });
        return { data: res.data.list, success: res.success, total: res.data.total };
    };
    useEffect(() => {
    }, [currentRow]);
    useEffect(() => {
        if (!createModalOpen) {
            setCurrentRow({});
        }
    }, [createModalOpen]);
    return (
        <PageContainer>
            <ProTable<API.ParkingSpaceItem, API.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            setCurrentRow({});
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>,
                ]}
                request={fetchData}
                columns={columns}
            />
            <ModalForm
                key={currentRow?.id} // 通过 key 属性重新创建 ModalForm 组件

                title={intl.formatMessage({
                    id: '1231241wda',
                    defaultMessage: '新增通知',
                })}
                width="380px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                initialValues={currentRow}
                onValuesChange={(changedValues) => setCurrentRow((prevValues) => ({ ...prevValues, ...changedValues }))}
                onFinish={async (value) => {
                    const success = await handleAdd(currentRow as API.NoticeItem);
                    if (success) {
                        handleModalOpen(false);
                        setCurrentRow({});
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormGroup>
                    <ProFormText width="md" name='title'
                        label="标题"
                        rules={[{ required: true, message: '请输入标题' }]} />
                    <ProFormTextArea width="md" label="内容"
                        name='content'
                        rules={[{ required: true, message: '请输入内容' }]} />
                    <ProFormSelect
                        name='status'
                        label="是否立刻发布"
                        valueEnum={{
                            0: '不',
                            1: '是',
                        }}
                        rules={[{ required: true, message: '请选择发布类型' }]}
                    />
                </ProFormGroup>

            </ModalForm>
        </PageContainer>
    );
};

export default ManageSuggest;
