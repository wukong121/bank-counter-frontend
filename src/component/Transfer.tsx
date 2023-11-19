import React from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import FormItem from "antd/es/form/FormItem";
import TransferTable from "./TransferTable";
import {useDispatch} from "react-redux";
import {refreshAction} from "../store/refresh.slice";
import {transferAction} from "../store/transfer.slice";

const {Option} = Select;

interface TransferType {
  accountId: number;
  recipientAccountId: number;
  amount: number;
  currency: string;
}

const Transfer: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: TransferType) => {
    console.log(values)
    dispatch(transferAction.update(values.accountId));
    const requestData = {
      recipientAccountId: values.recipientAccountId,
      amount: values.amount,
      currency: values.currency,
    };

    // 发送 POST 请求到后端
    fetch(`http://localhost:8080/api/v1/accounts/${values.accountId}/transfer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      dispatch(refreshAction.trigger());
      message.success('The transfer was successful');
      console.log('Account created successfully:', data);
    })
    .catch(error => {
      message.error(error.message);
      console.error('Error creating account:', error);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Row>
        <Col span={12}>
          <Form
              name="basic"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
            <FormItem label='AccountId' name='accountId' rules={[{required: true, message: 'Please input your id'}]}>
              <Input type='number'/>
            </FormItem>
            <FormItem label='RecipientId' name='recipientAccountId'
                      rules={[{required: true, message: 'Please input recipient id'}]}>
              <Input type='number'/>
            </FormItem>
            <Row>
              <Col span={12}>
                <FormItem label='Amount' name='amount' rules={[{required: true, message: 'Please input amount'}]}>
                  <Input type='number'/>
                </FormItem>
              </Col>
              <Col span={12}>
                <Form.Item label="Currency" name="currency" rules={[{required: true, message: 'Please select currency'}]}
                >
                  <Select defaultValue="CNY">
                    <Option value="USD">USD</Option>
                    <Option value="EUR">CNY</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <TransferTable />
        </Col>
      </Row>
  );
}

export default Transfer
