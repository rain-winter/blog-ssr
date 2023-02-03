import ListItem from '@/components/ListItem'
import { IconFont } from '@/utils/func'
import Prisma from '@/utils/prisma'
import { Card, Col, Row, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
const prisma = new Prisma()

interface IProps {
  params: { id: number }
}
/**
 * TODO SSR
 * @param param0
 */
export async function getServerSideProps({ params }: IProps) {
  const userId = +params.id
  const user = await prisma.user.findFirst({
    where: { id: +userId },
    include: {
      // articles:true,
      // tags:true
      tags: {
        include: {
          articles: true,
        },
      },
    },
  })

  const articles = await prisma.article.findMany({
    where: {
      userId,
    },
    include: {
      User: true,
    },
  })
  console.log(articles)
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  }
}

const UserDetail: NextPage = (props: any) => {
  const { articles } = props
  console.log(articles)
  const viewsCount = articles?.reduce(
    (prev: any, next: any) => prev + next?.views,
    0
  )
  console.log(viewsCount)
  return (
    <div>
      <Row justify="space-around">
        <Col span={7}>
          {articles.map((item) => (
            <ListItem key={item.id} article={item}></ListItem>
          ))}
        </Col>
        <Col span={3}>
          <Card css={{ marginTop: '20px' }}>
            <Card.Body>
              <Text size={20} color="primary">
                个人成就
              </Text>
              <div>
                <IconFont type="icon-chuangzuo" />
                共创作了
                <Text as={'span'} size={20} color="primary">
                  {articles.length}
                </Text>
                篇文章
              </div>
              <div>
                <IconFont type="icon-yuedujilu" />
                文章被阅读
                <Text as={'span'} size={20} color="primary">
                  {viewsCount}
                </Text>
                次
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

// 这样导出才会默认指向 /
export default observer(UserDetail)
