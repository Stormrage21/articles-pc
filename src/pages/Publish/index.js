import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select, message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { useState, useRef, useEffect } from 'react'
import { http } from '@/utils'

//

const { Option } = Select
const Publish = () => {

  const { channelStore } = useStore()
  const [fileList, setFileList] = useState([])
  const fileListRef = useRef([])
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    fileListRef.current = fileList
    console.log(fileList)
  }
  const [imgCount, setImagecount] = useState(1)
  const radioChange = (e) => {
    console.log(e.target.value)
    setImagecount(e.target.value)
    const rawValue = e.target.value
    if (fileListRef.current.length === 0) {
      return false
    }
    if (rawValue === 1) {
      const img = fileListRef.current ? fileListRef.current[0] : []
      setFileList([img])
    } else if (rawValue === 3) {
      setFileList(fileListRef.current)
    }
  }


  const navigate = useNavigate()
  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (articleId) {
      // 编辑
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      // 新增
      await http.post('/mp/articles?draft=false', params)
    }
    console.log(params)
    navigate('/article')
    message.success(`${articleId ? '更新成功' : '发布成功'}`)
  }









  const [params] = useSearchParams()
  const articleId = params.get('id')
  const form = useRef(null)
  console.log(articleId)
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      console.log(res)
      const { cover, ...formValue } = res.data
      console.log(cover)

      form.current.setFieldsValue({ ...formValue, type: cover.type })

      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      // setMaxCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [articleId])



  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? '修改' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'this is content' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}

            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}

              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish) 