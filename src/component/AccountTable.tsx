import React, {useEffect, useState} from "react";
import {Table} from "antd";
import StatusTag from "./StatusTag";
import DeleteAccount from "./DeleteAccount";
import {useSelector} from "react-redux";
import {RootState} from "../store/intex";

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
  const refresh = useSelector((state: RootState) => state.refresh.value);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/accounts')
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch(error => console.error('Error fetching user data:', error));
  }, [refresh]);

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
      render: (state: string) => <StatusTag status={state}/>
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
    {
      title: 'Action',
      key: 'action',
      render: (record: User) => (
          <DeleteAccount recordId={record.id}/>
      ),
    },
  ];

  return (
      <Table dataSource={userData} columns={columns}/>
  )
};

export default AccountTable;