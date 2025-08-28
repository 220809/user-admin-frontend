import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { userList } from '@/services/ant-design-pro/api';

const columns: ProColumns<API.User>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    valueType: 'text',
    copyable: true,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    valueType: 'text',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    valueType: 'image',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      '0': '-',
      '1': '男',
      '2': '女',
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      '0': '禁用',
      '1': '正常',
      '2': '锁定',
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueEnum: {
      '0': '用户',
      '1': '管理员',
    },
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [<a key="link">编辑</a>, <a key="link2">封禁</a>, <a key="link3">删除</a>],
  },
];

export default () => {
  return (
    <ProTable<API.User>
      columns={columns}
      request={async (params, sorter, filter) => {
        const users = await userList();
        return Promise.resolve({
          data: users,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: '用户列表',
        tooltip: '这是一个标题提示',
      }}
    />
  );
};
