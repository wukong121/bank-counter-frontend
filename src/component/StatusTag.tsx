import React from 'react';
import { Tag } from 'antd';

interface StatusTagProps {
  status: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  let color: string;

  switch (status) {
    case 'ACTIVE':
      color = 'green';
      break;
    case 'INACTIVE':
      color = 'yellow';
      break;
    case 'SET_FOR_DELETION':
      color = 'red';
      break;
    default:
      color = 'default';
      break;
  }

  return <Tag color={color}>{status}</Tag>;
};

export default StatusTag;
