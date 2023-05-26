import { addParkingSpace, deleteParkingSpace, queryParkingSpace } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProFormGroup, ProFormSelect } from '@ant-design/pro-components';
import {
    ModalForm,
    PageContainer,
    ProFormText,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';


/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ParkingSpaceItem) => {
    const hide = message.loading('正在添加');
    try {
        await addParkingSpace({ ...fields });
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
        // await updateRule({
        //     name: fields.name,
        //     desc: fields.desc,
        //     key: fields.key,
        // });
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
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.ParkingSpaceItem>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();
    const access = useAccess();
    const columns: ProColumns<API.ParkingSpaceItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceId" defaultMessage="拥有人" />,
            dataIndex: 'username',
            valueType: 'textarea'
        },

        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceLocation" defaultMessage="停车场位置" />,
            dataIndex: 'location',
            // hideInForm: true,
            valueEnum: {
                'A区': {
                    text: (
                        <FormattedMessage
                            id="A"
                            defaultMessage="A区"
                        />
                    ),
                },
                'B区': {
                    text: (
                        <FormattedMessage id="B" defaultMessage="B区" />
                    ),
                },
                'C区': {
                    text: (
                        <FormattedMessage id="C" defaultMessage="C区" />
                    ),
                },
                'D区': {
                    text: (
                        <FormattedMessage id="D" defaultMessage="D区" />
                    ),
                },
                'E区': {
                    text: (
                        <FormattedMessage id="E" defaultMessage="E区" />
                    ),
                },
                'F区': {
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
            title: <FormattedMessage id="pages.admin.manage-parking.table.parkingSpaceStatus" defaultMessage="状态" />,
            dataIndex: 'is_available',
            hideInForm: true,
            valueEnum: {
                true: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.available"
                            defaultMessage="可用"
                        />
                    ),
                    status: 'Success',
                },
                false: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-parking.table.parkingSpaceStatus.unavailable"
                            defaultMessage="不可用"
                        />
                    ),
                    status: 'Default',
                },
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
                            defaultMessage="短租"
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
                    status: 'Success',
                }
            },
        },

    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await queryParkingSpace(params);
        // setPageInfo({ ...pageInfo, total: res.total });
        return { data: res.data.list, success: res.success, total: res.data.total };
    };
    if (access.canAdmin) {
        columns.push({
            title: <FormattedMessage id="pages.admin.manage-parking.table.action" defaultMessage="Operating" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        setCurrentRow(record);
                        handleModalOpen(true)
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
        });
    };


    useEffect(() => {
        // 执行刷新操作
        // console.log('当前 currentRow:', currentRow);
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
                toolBarRender={() => {
                    if (access.canAdmin) {
                        return [
                            <Button
                                type="primary"
                                key="primary"
                                onClick={() => {
                                    handleModalOpen(true);
                                    setCurrentRow({})
                                }}
                            >
                                <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                            </Button>,
                        ]
                    }
                }
                }
                request={fetchData}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                    },
                }}
            />

            <ModalForm
                key={currentRow?.id} // 通过 key 属性重新创建 ModalForm 组件

                title={intl.formatMessage({
                    id: 'pages.admin.manage-user.table.createForm.newUser',
                    defaultMessage: '新增车位',
                })}
                width="750px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                initialValues={currentRow}
                onValuesChange={(changedValues) => setCurrentRow((prevValues) => ({ ...prevValues, ...changedValues }))}

                onFinish={async (value) => {
                    console.log('value:', value);
                    const success = await handleAdd(currentRow as API.ParkingSpaceItem);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormGroup>
                    <ProFormText width="md" name='location'
                        label="停车场位置"
                        rules={[{ required: true, message: '请输入停车场位置' }]} />
                    <ProFormText width="md" label="停车场编号"
                        name='number'
                        rules={[{ required: true, message: '请输入停车场编号' }]} />
                    <ProFormText width="md" name='price'
                        label="价格"
                        rules={[{ required: true, message: '请输入价格' }]}
                    />
                    <ProFormText width="md" name='username'
                        label="拥有人"
                        rules={[{ required: true, message: '请输入拥有人' }]} />
                    <ProFormSelect
                        name='type'
                        label="车位类型"
                        valueEnum={{
                            0: '短期',
                            1: '长期',
                        }}
                        rules={[{ required: true, message: '请选择车位类型' }]}
                    />
                    <ProFormSelect
                        name='is_available'
                        label="状态"
                        valueEnum={{
                            true: '可用',
                            false: '不可用',
                        }}
                        rules={[{ required: true, message: '请选择车位类型' }]}
                    />
                </ProFormGroup>
            </ModalForm>
        </PageContainer>
    );
};

export default ManageParking;
