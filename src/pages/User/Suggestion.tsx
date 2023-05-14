import { deleteParkingSpace, queryParkingSpace } from '@/services/ant-design-pro/api';
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
import { Button, Drawer, Input, message } from 'antd';
import React, { useMemo, useRef, useState } from 'react';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ParkingSpaceItem) => {
    const hide = message.loading('正在添加');
    try {
        // await addRule({ ...fields });
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
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
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

export default () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.ParkingSpaceItem>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();
    const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 20, total: 110 });

    const columns: ProColumns<API.ParkingSpaceItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceLocation" defaultMessage="停车场位置" />,
            dataIndex: 'location',
            // hideInForm: true,
            valueEnum: {
                'A': {
                    text: (
                        <FormattedMessage
                            id="A"
                            defaultMessage="A区"
                        />
                    ),
                },
                'B': {
                    text: (
                        <FormattedMessage id="B" defaultMessage="B区" />
                    ),
                },
                'C': {
                    text: (
                        <FormattedMessage id="C" defaultMessage="C区" />
                    ),
                },
                'D': {
                    text: (
                        <FormattedMessage id="D" defaultMessage="D区" />
                    ),
                },
                'E': {
                    text: (
                        <FormattedMessage id="E" defaultMessage="E区" />
                    ),
                },
                'F': {
                    text: (
                        <FormattedMessage id="F" defaultMessage="F区" />
                    ),
                },
            },
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-parking.table.parkingSpaceNumber"
                defaultMessage="编号"
            />,
            dataIndex: 'number',

            valueType: 'textarea',
            renderText: (val: string) =>
                `${val}${intl.formatMessage({
                    id: 'hao',
                    defaultMessage: '号',
                })}`,
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpacePrice" defaultMessage="身份证号" />,
            dataIndex: 'price',
            valueType: 'textarea',
            valueEnum: {
                3: {
                    text: (
                        <FormattedMessage
                            id="3"
                            defaultMessage="3"
                        />
                    ),
                },
                4: {
                    text: (
                        <FormattedMessage
                            id="4"
                            defaultMessage="4"
                        />
                    ),
                },
                5: {
                    text: (
                        <FormattedMessage
                            id="5"
                            defaultMessage="5"
                        />
                    ),
                },
            },
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
                    status: 'Success',
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
                    status: 'Error',
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
                        setCurrentRow(record);
                    }}
                >
                    <FormattedMessage id="pages.admin.manage-parking.table.action.edit" defaultMessage="编辑" />
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
        const res = await queryParkingSpace(params);
        // setPageInfo({ ...pageInfo, total: res.total });
        return { data: res.data.list, success: res.success, total: res.data.total };
    };

    const handleCurrentRowChange = useMemo(() => (key: keyof API.ParkingSpaceItem) => (value: string) => {
        setCurrentRow({
            ...currentRow,
            [key]: value,
        });
    }, [currentRow]);

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
                    },
                }}
            />
            <ModalForm
                title={intl.formatMessage({
                    id: 'pages.admin.manage-user.table.createForm.newUser',
                    defaultMessage: '新增车位',
                })}
                width="750px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    console.log(value);
                    const success = await handleAdd(value as API.ParkingSpaceItem);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormGroup>
                    <ProFormText width="md" name={['currentRow', 'location']}
                        label="停车场位置"
                        onChange={handleCurrentRowChange('location')}
                        value={currentRow?.location}
                        rules={[{ required: true, message: '请输入停车场位置' }]} />
                    <ProFormText.Password width="md" label="停车场编号"
                        name={['currentRow', 'number']}
                        value={currentRow?.number}
                        onChange={handleCurrentRowChange('number')}
                        rules={[{ required: true, message: '请输入停车场编号' }]} />
                    <ProFormText width="md" name={['currentRow', 'price']}
                        onChange={handleCurrentRowChange('price')}
                        value={currentRow?.price}
                        label="价格"
                        rules={[{ required: true, message: '请输入价格' }]}
                    />
                    <ProFormSelect
                        name={['currentRow', 'type']}
                        label="车位类型"
                        valueEnum={{
                            0: '临时',
                            1: '长期',
                        }}
                        value={currentRow?.type}
                        onChange={handleCurrentRowChange('type')}

                        placeholder=""
                        rules={[{ required: true, message: '请选择车位类型' }]}
                    />
                </ProFormGroup>
            </ModalForm>
        </PageContainer>
    );
};


