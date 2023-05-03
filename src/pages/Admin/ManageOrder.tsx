
import { addRule, deleteParkingSpace, queryOrderList, queryParkingSpace, queryUserList, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
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
import React, { useMemo, useRef, useState } from 'react';



const ManageOrder: React.FC = () => {


    const actionRef = useRef<ActionType>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.ParkingSpaceItem>[] = [
        {
            title: <FormattedMessage id="pages.admin.manage-order.table.orderParkingSpaceType" defaultMessage="订单类型" />,
            dataIndex: 'type',
            // hideInForm: true,
            valueEnum: {
                '0': {
                    text: (
                        <FormattedMessage id="pages.admin.manage-order.table.orderParkingSpaceType.temporary" defaultMessage="临时" />
                    ),
                },
                '1': {
                    text: (
                        <FormattedMessage id="pages.admin.manage-order.table.orderParkingSpaceType.forever" defaultMessage="长期" />
                    ),
                },
            },
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-order.table.orderParkingSpaceOwnerLicensePlateNumber"
                defaultMessage="车牌号"
            />,
            dataIndex: 'number',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-order.table.orderParkingSpaceLocation"
                defaultMessage="车位置"
            />,
            // dataIndex: 'number',
            render: (_, record) => `${record.location}区${record.number}号`,
            valueType: 'textarea',
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
                    id="pages.admin.manage-order.table.orderParkingSpaceStartTime"
                    defaultMessage="开始时间"
                />
            ),
            search: false,
            dataIndex: 'startTime',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.manage-order.table.orderParkingSpaceEndTime"
                    defaultMessage="结束时间"
                />
            ),
            search: false,
            dataIndex: 'endTime',
        },
        {
            title: <FormattedMessage id="pages.admin.manage-order.table.orderStatus" defaultMessage="订单状态" />,
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-order.table.orderStatus.uncompleted"
                            defaultMessage="处理中"
                        />
                    ),
                    status: 'Processing',
                },
                1: {
                    text: (
                        <FormattedMessage
                            id="pages.admin.manage-order.table.orderStatus.completed"
                            defaultMessage="已完成"
                        />
                    ),
                    status: 'Success',
                },
            },
        },
        {
            title: <FormattedMessage id="pages.admin.manage-order.table.orderParkingSpaceTotalPrice" defaultMessage="总价" />,
            dataIndex: 'totalPrice',
            hideInForm: true,
            sorter: true,
            renderText: (val: string) =>
                `${val}${intl.formatMessage({
                    id: 'yuan',
                    defaultMessage: '元',
                })}`,
        },
    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await queryOrderList(params);
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

export default ManageOrder;
