import { addParkingSpace, deleteParkingSpace, queryParkingSpace, queryVehiclRecords } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProFormGroup, ProFormSelect } from '@ant-design/pro-components';
import {
    ModalForm,
    PageContainer,
    ProFormText,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { Button,message } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';


export default () => {

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
            title: <FormattedMessage id="pages.admin.manage-parking.table.1231" defaultMessage="车牌号" />,
            dataIndex: 'vehicleNumber',
            valueType: 'textarea'
        },
        {
            title: <FormattedMessage id="pages.admin.manage-parking.table.1232" defaultMessage="进入时间" />,
            dataIndex: 'enterTime',
            valueType: 'textarea'
        },
        {
            title: <FormattedMessage
                id="pages.admin.manage-parking.table.1233"
                defaultMessage="离开时间"
            />,
            dataIndex: 'exitTime',
            valueType: 'textarea'
        },
    ];

    const fetchData = async (params: API.PageParams) => {
        const res = await queryVehiclRecords(params);
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

