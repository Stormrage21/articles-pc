import { Link, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, Menu } from 'antd'

import './index.scss'
import channelStore from '@/store/channels.Store'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState, useRef } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'


const { Option } = Select
const { RangePicker } = DatePicker
const Article = () => {
  const { pathname } = useLocation()

  const onFinish = (values) => {


    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params
    })
  }
  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 更新列表
    setParams({
      page: 1,
      ...params
    })
  }
  const navigate = useNavigate()
  const goPulish = (data) => {
    navigate(`/publish?id=${data.id}`)
  }

  const columns = [
    {
      title: 'cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'status',
      dataIndex: 'status',
      render: data => <Tag color="green">approved</Tag>
    },
    {
      title: 'publish date',
      dataIndex: 'pubdate'
    },
    {
      title: 'reads',
      dataIndex: 'read_count'
    },
    {
      title: 'comments',
      dataIndex: 'comment_count'
    },
    {
      title: 'likes',
      dataIndex: 'like_count'
    },
    {
      title: 'edit',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPulish(data)}
            />
            <Popconfirm
              title="Are you sure you want to delete this article?"
              onConfirm={() => delArticle(data)}
              okText="confirm"
              cancelText="cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: ['http://geek.itheima.net/resources/images/15.jpg'],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]

  const [article, setArticleList] = useState({
    list: [],
    count: 0
  })

  console.log(article)
  // const use = useRef([])
  // console.log(use)

  const [params, setParams] = useState({
    page: 1,
    per_page: 6
  })


  const { channelStore } = useStore()

  useEffect(() => {
    async function fetchArticleList () {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data


      // console.log(res1)
      setArticleList({
        list: results,
        count: total_count
      })
    }
    fetchArticleList()

  }, [params])


  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Content Management</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={{ status: null }}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>draft</Radio>
              <Radio value={1}>pending review</Radio>
              <Radio value={2}>review approved</Radio>
              <Radio value={3}>review failed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select the article channel"
              style={{ width: 120 }}
            >{channelStore.channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>
            ))}


            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">

            <RangePicker ></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`A total of ${article.count} results were found :`}>
        <Table columns={columns} dataSource={article.list} pagination={{
          position: ['bottomCenter'],
          total: article.count,
          current: params.page,
          pageSize: params.per_page,
          onChange: pageChange,

        }} />
      </Card>
    </div>
  )
}

export default observer(Article)