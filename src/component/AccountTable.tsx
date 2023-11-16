import React, {useEffect, useState} from "react";
import {Table} from "antd";

interface User {
  id: number;
  balance: number;
  currency: string;
  state: string;
  createdAt: string;
  modifiedAt: string;
}

const AccountTable: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    // Replace 'yourApiEndpoint' with the actual API endpoint
    fetch('http://localhost:8080/api/v1/accounts')
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Modified At',
      dataIndex: 'modifiedAt',
      key: 'modifiedAt',
    },
  ];

  return (
      <Table dataSource={userData} columns={columns}/>
  )
};

export default AccountTable;