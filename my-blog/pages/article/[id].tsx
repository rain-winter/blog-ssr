import { useStore } from '@/store'
import { IArticle } from '@/utils'
import Prisma from '@/utils/prisma'
import { Container, Row, Text, User } from '@nextui-org/react'
import { format } from 'date-fns'

// 转换md格式，并高亮代码 需要引入css
import markdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'

const md = markdownIt({
  html: true,
}).use(highlightjs, {
  inline: true,
})

const prisma = new Prisma()

interface IProps {
  article: IArticle
}
/**
 * SSR 渲染 控制台输出
 * @param params 接受动态参数 { id: 2 }
 * @returns
 */
export async function getServerSideProps({ params }: { params: any }) {
  // 获取文章
  await prisma.article.update({
    where: { id: +params.id },
    data: {
      // 阅览人数递增
      views: {
        increment: 1,
      },
    },
  })
  let article = await prisma.article.findFirst({
    where: {
      id: +params.id,
    },

    include: {
      User: true,
    },
  })

  //   返回个 props 在下面可以用
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  }
}

const ArticleDetail = (props: IProps) => {
  const { article } = props

  //   TODO 从里面拿到用户信息
  const {
    User: { id, nickname, avatar },
  } = article

  const store = useStore()
  // const userInfo = store?.user?.userInfo
  // console.log(userInfo)
  // 本人写的跳转到编辑页
  return (
    <Container fluid>
      <Text size={40} css={{ fontWeight: 'bloder' }}>
        {article.title}
      </Text>
      <Row>
        <User
          src={avatar}
          name={nickname}
          description={`${format(
            new Date(article.updatedAt),
            'yyyy-MM-dd hh:mm:ss'
          )}  阅读 ${article.views}`}
        />
      </Row>
      {/* react 渲染字符串 */}
      <div
        dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
      ></div>
    </Container>
  )
}

// 这样导出才会默认指向 /
export default ArticleDetail
