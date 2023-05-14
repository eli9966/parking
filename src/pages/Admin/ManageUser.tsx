import {addUser, deleteUser, queryUserList } from '@/services/ant-design-pro/api';
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
import type { FormValueType } from './components/UpdateForm';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
const handleRemove = async (selectedRow: API.UserListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    await deleteUser(selectedRow?.id ?? "")
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const ManageUser: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.admin.manage-user.table.userName"
          defaultMessage="用户名"
        />
      ),
      dataIndex: 'userName',
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
      title: <FormattedMessage id="pages.admin.manage-user.table.phondwae" defaultMessage="车牌号" />,
      dataIndex: 'vehicle_number',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.admin.manage-user.table.phone" defaultMessage="手机号" />,
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.admin.manage-user.table.idNum" defaultMessage="身份证号" />,
      dataIndex: 'idNum',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.admin.manage-user.table.address"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'address',
    },
    {
      title: <FormattedMessage id="pages.admin.manage-user.table.role" defaultMessage="权限" />,
      dataIndex: 'role',
      // hideInForm: true,
      valueEnum: {
        'user': {
          text: (
            <FormattedMessage
              id="pages.admin.manage-user.table.role.user"
              defaultMessage="用户"
            />
          ),
          status: 'Processing',
        },
        'admin': {
          text: (
            <FormattedMessage id="pages.admin.manage-user.table.role.admin" defaultMessage="管理员" />
          ),
          status: 'Success',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.admin.manage-user.table.lastLogin"
          defaultMessage="最后登录时间"
        />
      ),
      sorter: true,
      dataIndex: 'lastLogin',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.admin.manage-user.table.action" defaultMessage="Operating" />,
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
          <FormattedMessage id="pages.admin.manage-user.table.action.edit" defaultMessage="编辑" />
        </a>,
        <a
          key="subscribeAlert"
          onClick={async () => {
            const success = await handleRemove(record);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
        >
          <FormattedMessage
            id="pages.admin.manage-user.table.action.delete"
            defaultMessage="删除"
          />
        </a>,
      ],
    },
  ];

  const fetchData = async (params: API.PageParams) => {
    const res = await queryUserList(params);
    return {
      data: res.data.list,
      success: res.success,
      total: res.data.total,
    };
  };
  const handleCurrentRowChange = useMemo(() => (key: keyof API.UserListItem) => (value: string) => {
    setCurrentRow({
      ...currentRow,
      [key]: value,
    });
  }, [currentRow]);
  return (
    <PageContainer>
      <ProTable<API.UserListItem, API.PageParams>
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
              handleModalOpen(true);
              setCurrentRow(undefined);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={fetchData}
        columns={columns}
      />
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.admin.manage-user.table.createForm.newUser',
          defaultMessage: '新建用户',
        })}
        width="750px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(value);
          const success = await handleAdd(value as API.UserListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormGroup>
          <ProFormText width="md" name={['currentRow', 'userName']}
            label="用户名"
            onChange={handleCurrentRowChange('userName')}
            value={currentRow?.userName}
            rules={[{ required: true, message: '请输入用户名' }]} />
          <ProFormText.Password width="md" label="密码"
            name={['currentRow', 'password']}
            value={currentRow?.password}
            onChange={handleCurrentRowChange('password')}
            rules={[{ required: true, message: '请输入密码' }]} />
          <ProFormText width="md" name={['currentRow', 'phone']}
            onChange={handleCurrentRowChange('phone')}
            value={currentRow?.phone}

            label="联系方式" />
          <ProFormText width="md" name={['currentRow', 'idNum']}
            value={currentRow?.idNum}
            onChange={handleCurrentRowChange('idNum')} label="身份证号" />
          <ProFormText width="md" name={['currentRow', 'address']}
            onChange={handleCurrentRowChange('address')}
            value={currentRow?.address}
            label="详细地址" />
            <ProFormText width="md" name={['currentRow', 'vehicle_number']}
            onChange={handleCurrentRowChange('vehicle_number')}
            value={currentRow?.address}
            label="车牌号" />
          <ProFormSelect
            name={['currentRow', 'role']}
            label="权限"
            valueEnum={{
              admin: '管理员',
              user: '用户',
            }}
            value={currentRow?.role}
            onChange={handleCurrentRowChange('role')}
            placeholder=""
            rules={[{ required: true, message: '请选择用户权限' }]}
          />
        </ProFormGroup>
      </ModalForm>

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
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ManageUser;
