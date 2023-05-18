
import { addSuggestions, deleteParkingSpace, querySuggestions } from '@/services/ant-design-pro/api';
import { ActionType, ModalForm, ProColumns, ProDescriptionsItemProps, ProFormGroup, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import { useAccess } from 'umi';

const handleRemove = async (selectedRow: API.SuggestionItem) => {
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
const ManageSuggest: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);

    const [currentRow, setCurrentRow] = useState<API.SuggestionItem>();
    const access = useAccess();
    const handleClick = () => {
        handleModalOpen(true);
    };

    const actionRef = useRef<ActionType>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.SuggestionItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.suggestUser" />,
            dataIndex: 'username',
        },

        {
            title: <FormattedMessage
                id="pages.admin.manage-suggest.table.suggestContent"
            />,
            dataIndex: 'content',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-suggest.table.suggestTime"
            />,
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-suggest.table.suggestReply" />,
            dataIndex: 'replyContent',
            valueType: 'textarea',
            hideInForm: true,
        },
        {
            title: (<FormattedMessage id="pages.admin.manage-suggest.table.suggestReplyUser" />),
            search: false,
            dataIndex: 'replyname',
        },
        {
            title: (<FormattedMessage id="pages.admin.manage-suggest.table.suggestReplyTime" />),
            search: false,
            dataIndex: 'replyAt',
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
                2: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-suggest.table.suggestStatus.replied"
                        />
                    ),
                    status: 'Success',
                }
            },
        },

    ];
    if (access?.canAdmin) {
        columns.push(
            {
                title: <FormattedMessage id="pages.admin.manage-suggest.table.action" />,
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
                        <FormattedMessage id="pages.admin.manage-suggest.table.action.reply" />
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
            }
        )
    }
    const fetchData = async (params: API.PageParams) => {
        const res = await querySuggestions(params);
        // setPageInfo({ ...pageInfo, total: res.total });
        return { data: res.data.list, success: res.success, total: res.data.total };
    };

    return (
        <>
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
        <ModalForm<{
            reply_content: string;
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
                    console.log(value);
                    // setCurrentRow({ ...currentRow, reply_content: value.reply_content });
                    const success = await handleAdd({ ...currentRow, replyContent: value.reply_content });
                    if (success) {
                        message.success('提交成功');
                    }
                    return true;
                }
            }
        >
            <ProFormTextArea
                name="reply_content"
                placeholder="请输入反馈内容"
            />
        </ModalForm>
        </>
    );
};

export default ManageSuggest;
