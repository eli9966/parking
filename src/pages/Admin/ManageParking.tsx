import { addRule, queryParkingSpace, queryUserList, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
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
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();

        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ParkingSpaceItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.id),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const ManageParking: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.UserListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.ParkingSpaceItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();
    const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 20, total: 110 });

    const columns: ProColumns<API.ParkingSpaceItem>[] = [
        {
            title: (
                <FormattedMessage
                    id="pages.admin.manage-parking.table.parkingSpaceLocation"
                    defaultMessage="localtion"
                />
            ),
            dataIndex: 'location',
            tip: 'The rule name is the unique key',
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-parking.table.parkingSpaceNumber"
                defaultMessage="编号"
            />,
            dataIndex: 'number',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpacePrice" defaultMessage="身份证号" />,
            dataIndex: 'price',
            valueType: 'textarea',
            sorter: true,
            hideInForm: true,
            renderText: (val: string) =>
                `${val}${intl.formatMessage({
                    id: 'pages.admin.manage-parking.table.parkingSpacePriceUnit',
                    defaultMessage: '元/小时 ',
                })}`,
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.manage-parking.table.parkingSpaceDescription"
                    defaultMessage="描述"
                />
            ),
            search: false,
            dataIndex: 'desc',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceStatus" defaultMessage="状态" />,
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.available"
                            defaultMessage="可用"
                        />
                    ),
                    status: 'Processing',
                },
                1: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.unavailable"
                            defaultMessage="不可用"
                        />
                    ),
                    status: 'Default',
                },
                2: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.reserved"
                            defaultMessage="已预约"
                        />
                    ),
                    status: 'Error',
                },
                3: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.occupied"
                            defaultMessage="已占用"
                        />
                    ),
                    status: 'Success',
                }
            },
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceType" defaultMessage="状态" />,
            dataIndex: 'type',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceType.temporary"
                            defaultMessage="临时"
                        />
                    ),
                    status: 'Processing',
                },
                1: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceType.forever"
                            defaultMessage="长期"
                        />
                    ),
                    status: 'Default',
                }
            },
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.manage-parking.table.parkingSpaceLastOperated"
                    defaultMessage="最后操作时间"
                />
            ),
            sorter: true,
            dataIndex: 'operateTime',
            valueType: 'dateTime',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.action" defaultMessage="Operating" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    <FormattedMessage id="pages.admin.manage-parking.table.action.edit" defaultMessage="编辑" />
                </a>,
                <a key="subscribeAlert" href="https://procomponents.ant.design/">
                    <FormattedMessage
                        id="pages.admin.manage-parking.table.action.delete"
                        defaultMessage="删除"
                    />
                </a>,
            ],
        },
    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await queryParkingSpace(params);
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
                // pagination={{ ...pageInfo }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>,
                ]}
                request={fetchData}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
                            &nbsp;&nbsp;
                            <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="Total number of service calls"
                                />{' '}
                                {selectedRowsState.reduce((pre, id) => pre + item.id!, 0)}{' '}
                                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage
                            id="pages.searchTable.batchApproval"
                            defaultMessage="Batch approval"
                        />
                    </Button>
                </FooterToolbar>
            )}
            <ModalForm
                title={intl.formatMessage({
                    id: 'pages.searchTable.createForm.newRule',
                    defaultMessage: 'New rule',
                })}
                width="400px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.RuleListItem);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: (
                                <FormattedMessage
                                    id="pages.searchTable.ruleName"
                                    defaultMessage="Rule name is required"
                                />
                            ),
                        },
                    ]}
                    width="md"
                    name="name"
                />
                <ProFormTextArea width="md" name="desc" />
            </ModalForm>
            {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      /> */}

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.userName && (
                    <ProDescriptions<API.UserListItem>
                        column={2}
                        title={currentRow?.userName}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.userName,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default ManageParking;
