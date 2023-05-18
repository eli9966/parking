
import {queryOrderList } from '@/services/ant-design-pro/api';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';



const ManageOrder: React.FC = () => {


    const actionRef = useRef<ActionType>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.OrderListItem>[] = [
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
            dataIndex: 'vehicle_number',
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
            sorter: true,
            hideInForm: true,
            renderText: (val: string) =>
                `${val}${intl.formatMessage({
                    id: 'pages.admin.manage-parking.table.parkingSpacePriceUnit',
                    defaultMessage: '元/月 ',
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
            dataIndex: 'start_time',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.manage-order.table.orderParkingSpaceEndTime"
                    defaultMessage="结束时间"
                />
            ),
            search: false,
            dataIndex: 'end_time',
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
            dataIndex: 'total_price',
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
