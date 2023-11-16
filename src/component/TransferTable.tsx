import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../store/intex";

interface Transfer {
  accountId: number;
  amount: number;
  currency: string;
  type: string;
  transactionDate: string;
}

interface TransferTableParams {
  id: number;
}

const TransferTable: React.FC<TransferTableParams> = ({id}) => {
  const [transferData, settransferData] = useState<Transfer[]>([]);
  const refresh = useSelector((state: RootState) => state.refresh.value);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/accounts/${id}/statements/mini`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      return response.json();
    })
    .then(data => settransferData(data))
    .catch(error => console.error('Error fetching user data:', error));
  }, [refresh]);

  const columns = [
    {
      title: 'AccountId',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'TransactionDate',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
  ];

  return (
      <Table dataSource={transferData} columns={columns}/>
  );
};

export default TransferTable;