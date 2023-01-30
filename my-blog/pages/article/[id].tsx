import { useStore } from '@/store'
import { IArticle } from '@/utils'
import Prisma from '@/utils/prisma'
import { Container, Grid } from '@nextui-org/react'
import Markdown from 'markdown-to-jsx'
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
  const userInfo = store?.user?.userInfo
  console.log(userInfo)
  // 本人写的跳转到编辑页
  return (
    <Container fluid>
      <Grid.Container gap={2} justify="center" wrap='wrap' >
        <Grid xs={8}>
          <Markdown>{article.content}</Markdown>
        </Grid>
        <Grid xs={4}>1212</Grid>
      </Grid.Container>
    </Container>
  )
}

// 这样导出才会默认指向 /
export default ArticleDetail
