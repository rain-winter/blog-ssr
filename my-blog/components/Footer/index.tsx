import styled from '@emotion/styled'
import type { NextPage } from 'next'
const Footer: NextPage = () => {
  return <Div>footer</Div>
}

const Div = styled.div`
  height: 40px;
  line-height:40px;
  background-color: #dfe6e9;
  border-radius: 4px;
  color: black;
  text-align: center;
`

export default Footer
