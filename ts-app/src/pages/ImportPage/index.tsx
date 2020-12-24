import { useState } from 'react'
import { Input, Button, Row, Col, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { selectKeywords } from 'store/selectors/keywords'
import { UploadOutlined } from '@ant-design/icons'
import { addKeywords } from 'store/actions/keywords'
import { Keyword } from 'store/types/keywords'

const { TextArea } = Input
const { Title } = Typography

const ImportPage = () => {
  const dispatch = useDispatch()
  const keywords = useSelector(selectKeywords)
  const keywordsText = keywords.map((keyword) => keyword.keyword).join('\n')
  const [text, setText] = useState(keywordsText)

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const onImportClick = () => {
    const keywords = text.trim().split('\n')
    const formattedKeywords: Array<Keyword> = keywords.map((keyword, idx) => ({
      id: `kw${idx}`,
      keyword,
      use: true
    }))
    dispatch(addKeywords(formattedKeywords))
  }

  const placeholder = [
    'купить цветы',
    'купить цветы недорого',
    'купить цветы недорого в спб'
  ]

  return (
    <>
      <Title level={2}>Импортируйте ключевые слова</Title>
      <Row gutter={[8, 24]}>
        <Col span={24}>
          <TextArea
            value={text}
            onChange={onTextChange}
            placeholder={placeholder.join('\n')}
            autoSize={{ minRows: 8, maxRows: 20 }}
          />
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            icon={<UploadOutlined />}
            onClick={onImportClick}
          >
            Импортировать
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ImportPage
