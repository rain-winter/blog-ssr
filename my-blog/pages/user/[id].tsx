import ListItem from '@/components/ListItem'
import { IconFont } from '@/utils/func'
import Prisma from '@/utils/prisma'
import styled from '@emotion/styled'
import { Button, Card, Col, Row, Text } from '@nextui-org/react'
import { Avatar } from 'antd'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Link from 'next/link'
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
      user,
    },
  }
}

const UserDetail: NextPage = (props: any) => {
  const { articles, user } = props

  // 总浏览次数
  const viewsCount = articles?.reduce(
    (prev: any, next: any) => prev + next?.views,
    0
  )
  return (
    <div>
      <Row justify="space-around">
        <Col span={7}>
          <Card variant="bordered">
            <Card.Body>
              <Div>
                <div>
                  <Avatar size={90} src={user.avatar} />
                  <div>
                    <Text>{user.nickname}</Text>
                    <Text size={'$xs'}>
                      <IconFont type={'icon-gongzuoguanli-gongzuodating'} />{' '}
                      {user.job}{' '}
                    </Text>
                    <Text size={'$xs'}>
                      <IconFont type="icon-ziwojieshao" /> {user.introduce}
                    </Text>
                  </div>
                </div>
                <Link href={`/user/profile`}>
                  <Button bordered light color="primary" auto>
                    编辑个人资料
                  </Button>
                </Link>
              </Div>
            </Card.Body>
          </Card>
          {articles.map((item: any) => (
            <ListItem key={item.id} article={item}></ListItem>
          ))}
        </Col>
        <Col span={3}>
          <Card variant="bordered">
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

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    & > div {
      padding-left: 20px;
    }
  }
`

// 这样导出才会默认指向 /
export default observer(UserDetail)
