import { Button, Checkbox, Form, Input, Card, message } from 'antd'

import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'



function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()

  const onFinish = async (values) => {

    try {
      await loginStore.getToken(
        {
          mobile: values.username,
          code: values.password
        })
      navigate('/', { replace: true })
      message.success('login success')
    } catch (e) {
      message.error(e.response?.data?.message || 'login failed')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />

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
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter a user name',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'The mobile phone number is not in the right format',
                validateTrigger: 'onBlur',
              },

            ]}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password
            "
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              }, {
                min: 6,
                validateTrigger: 'onBlur',
                message: 'The password must contain at least six characters',
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
              I agree to the user agreement and privacy policy
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )

}
export default Login