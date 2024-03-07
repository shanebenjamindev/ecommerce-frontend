import { Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import * as UserServices from '../../../services/UserService';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

export default function UserManagement() {
  const user = useSelector(state => state.user);
  const [selectionType, setSelectionType] = useState('checkbox');
  const { data: users, isLoading, isError } = useQuery(['user'], () => getAllUser(user.access_token));

  const getAllUser = async () => {
    try {
      const res = await UserServices.getAllUser(user.access_token);
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (value) => {
    const res = await UserServices.deleteUser(value, user.access_token)
    const { message } = res.data
    console.log(message);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      render: (user) => (
        <div className='d-md-flex' style={{ gap: "5px ", justifyContent: "center" }}>
          <button type='button' className='btn btn-primary'>Edit</button>
          <button type='button' className='btn btn-danger' onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
      )
    }
  ];


  return (
    <div>
      <Table rowSelection={{
        type: selectionType,
        ...rowSelection,
      }} dataSource={users} columns={columns} loading={isLoading} rowKey={"_id"} />
    </div>
  )
}
