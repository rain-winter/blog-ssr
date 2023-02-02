import { IArticle } from '@/utils'
import { Card, Row, Text, User } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import { markdownToTxt } from 'markdown-to-txt'
import Link from 'next/link'

interface IProps {
  article: IArticle
}

const ListItem = (props: IProps) => {
  const { article } = props
  // * 使用 Link 跳转
  return (
     <Link href={`/article/${article.id}`}>
      <Card css={{  cursor: 'pointer',width:'320px' }}>
        <Card.Header css={{ fontWeight: 'bold' }}>{article.title}</Card.Header>
        <Card.Body>
          <Row justify="space-between" align='center'>
            <Text
              css={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {markdownToTxt(article.content)}
            </Text>
            <User
              src={article.User.avatar}
              name={article.User.nickname}
              squared
            />
          </Row>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="space-between">
            <div>
              <Text color="#999">阅览人数 : {article.views}</Text>
            </div>
            <Text color="#999">
              {formatDistanceToNow(new Date(article.createdAt))}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default ListItem
