import React, {useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Col, Drawer, Form, Input, Row, Select, Space, message} from 'antd';

const {Option} = Select;

interface AccountType {
  id: number;
  balance: number;
  currency: string;
  state: string;
  createdAt: string | undefined;
  modifiedAt: string | undefined
}

const NewAccount: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.submit();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: AccountType) => {
    // 将表单数据转换为发送到后端的格式
    const requestData = {
      id: values.id,
      balance: values.balance,
      currency: values.currency,
      state: values.state,
      createdAt: new Date().toISOString(), // 使用当前时间作为创建时间
      modifiedAt: new Date().toISOString(), // 使用当前时间作为修改时间
    };

    // 发送 POST 请求到后端
    fetch('http://localhost:8080/api/v1/accounts', {
      method: 'POST',
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
      message.success('Account created successfully');
      console.log('Account created successfully:', data);
      onClose();
    })
    .catch(error => {
      message.error('Failed to create user')
      console.error('Error creating account:', error);
      onClose();
    });
  };

  return (
      <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined/>}>
          New account
        </Button>
        <Drawer
            title="Create a new account"
            width={720}
            onClose={onClose}
            open={open}
            styles={{
              body: {
                paddingBottom: 80,
              },
            }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            }
        >
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="id"
                    label="Id"
                    rules={[{required: true, message: 'Please enter user id'}]}
                >
                  <Input placeholder="Please enter user id"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="balance"
                    label="Balance"
                    rules={[{required: true, message: 'Please enter Balance'}]}
                >
                  <Input placeholder="Please enter balance"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="currency"
                    label="Currency"
                    rules={[{required: true, message: 'Please choose the currency type'}]}
                >
                  <Select placeholder="Please choose the currency type">
                    <Option value="USD">USD</Option>
                    <Option value="CNY">CNY</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="state"
                    label="State"
                    rules={[{required: true, message: 'Please choose the state'}]}
                >
                  <Select placeholder="Please choose the state">
                    <Option value="ACTIVE">ACTIVE</Option>
                    <Option value="INACTIVE">INACTIVE</Option>
                    <Option value="SET_FOR_DELETION">SET_FOR_DELETION</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
  );
};

export default NewAccount;