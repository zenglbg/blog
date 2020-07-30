import React, { useState, useCallback, memo, useEffect } from 'react'
import * as dayjs from 'dayjs'
import SPTDataTable from '../../common/SPTDataTable'
import { Badge } from 'antd'
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
        <a href="">编辑</a>
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
