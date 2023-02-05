// import Prisma from '@/utils/prisma'
import ListItem from '@/components/ListItem'
import Prisma from '@/utils/prisma'
import { Grid } from '@nextui-org/react'
const prisma = new Prisma()
/**
 * ssr 给服务端渲染
 * ssg 提前在编译时生成静态页面，不经过服务端 。动态元素太多就不适合 官网会用
 * csr 客户端渲染（前端渲染）
 * dynimic 路由
 */
interface IProps {
  articles: []
}
/**
 * ssr 渲染
 */

export async function getServerSideProps() {
  // 获取文章
  let articls = await prisma.article.findMany({
    include: {
      User: true,
    },
  })
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articls)),
    },
  }
}

// export default function Page() {
//   return {}
// }

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>
// }

const Home = ({ articles }: IProps) => {
  return (
    <Grid.Container gap={1} justify="center" alignItems="center">
      {articles.map((article, index) => (
        <Grid css={{ width: '320px' }} key={index}>
          <ListItem key={index} article={article} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

//// 这样导出才会默认指向 
export default Home
