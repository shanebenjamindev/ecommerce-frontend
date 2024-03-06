import { Space, Table, Tag } from 'antd';
import { useEffect } from 'react';
import * as UserServices from '../../../services/UserService';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

export default function UserManagement() {
  const user = useSelector(state => state.user);

  const { data: users, isLoading, isError } = useQuery(['user'], () => getAllUser(user.access_token));

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const res = await UserServices.getAllUser(user.access_token);
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name', // Unique key for this column
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email', // Unique key for this column
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone', // Unique key for this column
    },
  ];

  const usersWithKeys = users?.map((user, index) => {
    console.log(users);
  });

  return (
    <div>
      <Table dataSource={users} columns={columns} loading={isLoading}/>
    </div>
  )
}
