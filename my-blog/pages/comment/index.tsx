import { Row } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

const Comment: NextPage = () => {
  return <Row justify="center">评论</Row>
}

// 这样导出才会默认指向 /
export default observer(Comment)
