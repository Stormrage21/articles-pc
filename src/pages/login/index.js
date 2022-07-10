import { Button, Checkbox, Form, Input, Card } from 'antd'
import React from 'react'
import logo from '@/assets/logo.png'
import './index.scss'
function Login () {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur',
              },

            ]}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码
            "
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              }, {
                min: 6,
                validateTrigger: 'onBlur',
                message: '密码最低为6位',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>
              加载黑墙破译程序
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              入侵
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )



}
export default Login