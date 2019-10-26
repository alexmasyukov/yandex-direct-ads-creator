import React, { Component } from 'react'
import Word from "components/Filter/Word"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Keyword from "components/Filter/Keyword"

const initialKeywords = [
  'доставка цветов',
  'доставка цвета',
  'доставка цветов чита',
  'доставка цветов недорого',
  'заказать цветы с доставкой',
  'заказ цветов с доставкой',
  'доставка цветов круглосуточно',
  'доставка цветов чита недорого',
  'доставка цветов на дом',
  'заказ цветов с доставкой чита',
  'доставка цветом на дом',
  'доставка цветов курьером',
  'доставка цветов чита круглосуточно',
  'заказать цветы с доставкой в чите',
  'чита доставка цветов на дом',
  'доставка цветов дешево',
  'доставка цветов на дом недорого',
  'доставка цветов в чите недорого на дом',
  'доставка цветов в чите курьером',
  'заказ цветов с доставкой чита недорого',
  'заказ доставки цветов недорого',
  'интернет доставка цветов',
  'магазин цветов с доставкой',
  'доставка цветов в чите курьером недорого',
  'купить цветы с доставкой',
  'доставка цветов каталог',
  'доставка цветов чита дешево',
  'телефон доставки цветов',
  'доставка цветов круглосуточно дешево',
  'заказать цветы с доставкой недорого',
  'доставка цветов день в день',
]


// handleKeywordClick(id, keyword) {
//   console.log(id, keyword)
//   this.setState(prevState => ({
//     keywords: {
//       ...prevState.keywords,
//       [id]: {
//         ...prevState.keywords[id],
//         unactive: true
//       }
//     }
//   }))
// }

function getValuesByKey(key, array) {
  return array.reduce(function (values, item) {
    (key in item) && values.push(item[key])
    return values
  }, [])
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.handleWordClick = this.handleWordClick.bind(this)
  }

  state = {
    keywords: [],
    words: []
  }

  setKeywords() {
    const keywords = initialKeywords.map((keyword, i) => ({
      id: i,
      unactive: false,
      keyword,
    }))

    this.setState({
      keywords
    }, () => this.setWords())
  }

  setWords() {
    const allWords = Array.from(new Set(
      getValuesByKey('keyword', this.state.keywords).join(' ').split(' ')
    ))

    const words = allWords.map((word, i) => ({
      id: i,
      unactive: false,
      isNotUse: false,
      word,
    }))

    this.setState({
      words
    })
  }

  componentDidMount() {
    this.setKeywords()
  }

  // todo После нажатия на включение слова,
  //  нужно проверять его ключевик на другие отключенные слова,
  //  если они есть, не включаем его обратно

  filterWords() {
    console.log('filterWords')
    const wordsByOnlyActiveKeywords = Array.from(new Set(
      this.state.keywords.reduce(function (values, item) {
        (item.unactive === false) && values.push(item.keyword)
        return values
      }, []).join(' ').split(' ')
    ))

    console.log(wordsByOnlyActiveKeywords.length)
    const oldWords = [...this.state.words]
    const words = oldWords.map(item => {
      if (!wordsByOnlyActiveKeywords.includes(item.word)) {
        item.isNotUse = true
      } else {
        item.isNotUse = false
      }
      return item
    })

    this.setState({
      words
    })

    console.log(wordsByOnlyActiveKeywords)
  }

  filterKeywords(word, unactiveStatus) {
    const keywords = this.state.keywords.map(keyword => {
      if (keyword.keyword.trim().split(' ').includes(word)) {
        keyword.unactive = unactiveStatus
      }
      return keyword
    })

    this.setState({
      keywords
    }, () => this.filterWords())
  }

  handleWordClick(id, word) {
    const index = this.state.words.findIndex(word => word.id === id)
    const status = !this.state.words[index].unactive

    this.setState(prevState => {
      const words = [...prevState.words]
      words[index].unactive = status

      return {
        words
      }
    }, () => this.filterKeywords(word, status))
  }


  render() {
    const { keywords, words } = this.state
    return (
      <Container>
        <Row>
          <Col md={8}>
            {keywords.map(keyword =>
              <Keyword
                key={keyword.id}
                {...keyword}
              />
            )}
          </Col>
          <Col md={4}>
            {words.map(word =>
              <Word
                key={word.id}
                onClick={this.handleWordClick}
                {...word}
              />
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Filter