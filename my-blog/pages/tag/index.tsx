import { useStore } from '@/store'
import { Tag } from '@/utils'
import api from '@/utils/api'
import http from '@/utils/http'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Tag: NextPage = () => {
  const store = useStore()
  const { id:userId } = JSON.parse(store?.user?.userInfo)
  const [followTags, setFollowTags] = useState<Tag[]>()
  const [allTags, setAllTags] = useState<Tag[]>()
  // TODO CSR 客户端渲染
  useEffect(() => {
    http.get(api.getTag).then((res) => {
      console.log(res)
      // const { followTags = [], allTags = [] } = res.data
      // setFollowTags(followTags)
      // setAllTags(allTags)
    })
  }, [])
  return <div></div>
}

// http://localhost:3000/tag
export default Tag
