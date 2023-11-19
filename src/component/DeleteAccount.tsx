import React from "react";
import {Button, message, Modal} from "antd";
import {ExclamationCircleFilled} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {refreshAction} from "../store/refresh.slice";

const {confirm} = Modal;

interface DeleteAccountPrams {
  recordId: number;
}

const DeleteAccount: React.FC<DeleteAccountPrams> = ({recordId}) => {
  const dispatch = useDispatch();
  const onClick = () => {
    confirm({
      title: 'Do you want to delete this account?',
      icon: <ExclamationCircleFilled/>,
      content: 'Please confirm carefully before deleting.',
      onOk() {
        fetch(`http://localhost:8080/api/v1/accounts/${recordId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Server error: ' + response.status);
          }
          dispatch(refreshAction.trigger());
          message.success('Successfully deleting the account: ', recordId);
        })
        .catch((error) => console.error("Error deleting user data:", error));
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
      <Button onClick={onClick} danger>Delete</Button>
  );
};

export default DeleteAccount;