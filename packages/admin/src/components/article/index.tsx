import React, { useState, useCallback, memo, useEffect } from 'react'
import * as dayjs from 'dayjs'
import SPTDataTable from '../../common/SPTDataTable'
import { Popconfirm, Badge, message, Divider } from 'antd'
import { map } from 'rxjs/operators'
import { Articlesr } from '@providers/article'
import { Categorysr } from '@providers/category'
import { Tagssr } from '@providers/tags'

interface IArticleProps {}

const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const isDraft = status === 'draft'
      return (
        <Badge
          color={isDraft ? 'gold' : 'green'}
          text={isDraft ? '草稿' : '已发布'}
        />
      )
    },
  },
  {
    title: '分类',
    key: 'category',
    dataIndex: 'category',
    render: (category) => <span>3333</span>,
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => <span>333</span>,
  },
  {
    title: '阅读量',
    dataIndex: 'views',
    key: 'views',
    render: (views) => (
      <Badge
        count={views}
        showZero={true}
        overflowCount={Infinity}
        style={{ backgroundColor: '#52c41a' }}
      />
    ),
  },
  {
    title: '发布时间',
    dataIndex: 'publishAt',
    key: 'publishAt',
    render: (date) => dayjs.default(date).format('YYYY-MM-DD HH:mm:ss'),
  },
]

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    Categorysr.getCategorys()
    Tagssr.getTags()
    return () => {
      // cleanup
    }
  }, [])

  // const getViews = useCallback(() => {
  //   setLoading(true)
  // }, [])

  const getArticles = useCallback((params = {}) => {
    return Articlesr.getArticles(params).pipe(
      map(({ data }) => {
        console.log(data)
        if (data && data.success) {
          setParams(params)
          setTotal(data.data.total)
          setArticles(data.data.data)
        }
        return data
      })
    )
  }, [])

  const deleteArticle = useCallback(
    (id) => {
      return Articlesr.deleteArticle(id).subscribe((_) => {
        message.success('文章删除成功')
        getArticles(params)
      })
    },
    [params]
  )

  const titleColumn = {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <a href="">{text}</a>,
  }

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <span>
        <a>编辑</a>
        <Divider type="vertical" />
        <span></span>
        <a onClick={() => {}}>
          <span>查看访问</span>
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="确认删除这个文章"
          onConfirm={() => deleteArticle(record.id)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }

  return (
    <div className="article-page">
      <SPTDataTable
        data={articles}
        columns={[titleColumn, ...columns, actionColumn]}
        total={total}
        onSearch={getArticles}
      />
    </div>
  )
}

export default Article
