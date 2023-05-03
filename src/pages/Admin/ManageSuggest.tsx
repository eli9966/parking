
import { addRule, deleteParkingSpace, queryOrderList, queryParkingSpace, querySuggestions, queryUserList, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProDescriptionsItemProps, ProFormGroup, ProFormSelect } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';
import React, {useRef, useState } from 'react';

const handleRemove = async (selectedRow: API.ParkingSpaceItem) => {
    const hide = message.loading('正在删除');
    if (!selectedRow) return true;
    try {
        await deleteParkingSpace(selectedRow?.id ?? "");
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const ManageSuggest: React.FC = () => {

    const [currentRow, setCurrentRow] = useState<API.ParkingSpaceItem>();

    const actionRef = useRef<ActionType>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.ParkingSpaceItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.suggestUser" />,
            dataIndex: 'userName',
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-suggest.table.suggestTime"
            />,
            dataIndex: 'suggestTime',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-suggest.table.suggestContent"
            />,
            dataIndex: 'content',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.suggestReply" />,
            dataIndex: 'reply',
            valueType: 'textarea',
            hideInForm: true,
        },
        {
            title: (<FormattedMessage id="pages.admin.manage-suggest.table.suggestReplyUser"/>),
            search: false,
            dataIndex: 'replyUser',
        },
        {
            title: (<FormattedMessage id="pages.admin.manage-suggest.table.suggestReplyTime"/>),
            search: false,
            dataIndex: 'replyTime',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.suggestStatus" defaultMessage="状态" />,
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-suggest.table.suggestStatus.unread"
                        />
                    ),
                    status: 'Default',
                },
                1: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-suggest.table.suggestStatus.read"
                        />
                    ),
                    status: 'Processing',
                },
                2:{
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-suggest.table.suggestStatus.replied"
                        />
                    ),
                    status: 'Success',
                }
            },
        },
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.action" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        setCurrentRow(record);
                    }}
                >
                    <FormattedMessage id="pages.admin.manage-suggest.table.action.reply"/>
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
                        id="pages.admin.manage-parking.table.action.delete"
                        defaultMessage="删除"
                    />
                </a>,
            ],
        },
    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await querySuggestions(params);
        // setPageInfo({ ...pageInfo, total: res.total });
        return { data: res.data.list, success: res.success, total: res.data.total };
    };

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

                request={fetchData}
                columns={columns}
            />
        </PageContainer>
    );
};

export default ManageSuggest;
