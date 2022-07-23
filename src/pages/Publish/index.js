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
    // console.log(fileList)
  }
  const [imgCount, setImagecount] = useState(1)
  console.log()

  const radioChange = (e) => {
    // console.log(e.target.value)
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
    // console.log(params)
    navigate('/article')
    message.success(`${articleId ? 'update success' : 'upload success'}`)
  }









  const [params] = useSearchParams()
  const articleId = params.get('id')
  const form = useRef(null)
  // console.log(articleId)
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      // console.log(res)
      const { cover, ...formValue } = res.data
      console.log(formValue)

      form.current.setFieldsValue({ ...formValue, type: cover.type })
      // console.log(form.current)

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
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? 'edit' : 'publish'} article</Breadcrumb.Item>
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
            label="title"
            name="title"
            rules={[{ required: true, message: 'Please enter the article title' }]}
          >
            <Input placeholder="Please enter the article title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="channel"
            name="channel_id"
            rules={[{ required: true, message: 'Please select article channel道' }]}
          >
            <Select placeholder="Please select article channel" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}

            </Select>
          </Form.Item>

          <Form.Item label="cover">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>Single Image</Radio>
                <Radio value={3}>3 Images</Radio>
                <Radio value={0}>No Image</Radio>
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
            label="content"
            name="content"
            rules={[{ required: true, message: 'Please enter article content' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter article content"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? 'Edit Article' : 'Publish Article'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish) 