import api from '@/utils/api'
import http from '@/utils/http'
import { Row } from '@nextui-org/react'
import { Button, Form, Input, message } from 'antd'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
const { TextArea } = Input

const layout = {
  labelCol: { span: 3 },
  //   wrapperCol: { span: 16 },
}

const tailLayout = {
  //   wrapperCol: { offset: 4 },
}

const Profile: NextPage = () => {
  // TODO 使用antd表单组件
  const [form] = Form.useForm()
  const { back } = useRouter()

  const handleSubmit = async (values: any) => {
    let res: any = await http.post(api.userUpdate, { ...values })
    message.info(res.msg)
    back()
  }
  return (
    <Row justify="center">
      <Form
        style={{ width: '700px' }}
        {...layout}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item label="用户名" name="nickname">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="职位" name="job">
          <Input placeholder="请输入职位" />
        </Form.Item>
        <Form.Item label="个人介绍" name="introduce">
          <TextArea placeholder="请输入个人介绍" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Row justify={'space-around'}>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
            <Button>取消</Button>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  )
}

// 这样导出才会默认指向 /
export default observer(Profile)
