import React, { Component } from 'react'
import Word from "components/Filter/Word"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Keyword from "components/Filter/Keyword";

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

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleWordClick = this.handleWordClick.bind(this)
  }

  state = {
    keywords: {},
    words: {}
  }

  setKeywords() {
    const keywords = []

    initialKeywords.forEach((keyword, i) => {
      keywords[i] = {
        id: i,
        unactive: false,
        keyword,
      }
    })

    this.setState({
      keywords
    })
  }

  setWords() {
    const allWords = Array.from(new Set(initialKeywords.join(' ').split(' ')))
    const words = []

    allWords.forEach((word, i) => {
      words[i] = {
        id: i,
        unactive: false,
        word,
      }
    })

    this
      .setState({
        words
      })
  }

  componentDidMount() {
    this.setKeywords()
    this.setWords()
  }

  setKeywordUnactiveStatus(id, status) {
    this.setState(prevState => ({
      keywords: {
        ...prevState.keywords,
        [id]: {
          ...prevState.keywords[id],
          unactive: status
        }
      }
    }))
  }

  filterKeywords(word, unactiveStatus) {
    const keywords = Object.values(this.state.keywords)

    for (let i = 0; i < keywords.length; i++) {
      const kw = keywords[i]
      console.log(kw.keyword, word)
      console.log(kw.keyword.split(' ').includes(word))
      if (kw.keyword.trim().split(' ').includes(word)) {
        this.setKeywordUnactiveStatus(kw.id, unactiveStatus)
      }
    }
  }

  handleWordClick(id, word) {
    // console.log(id, word)
    this.setState(prevState => ({
      words: {
        ...prevState.words,
        [id]: {
          ...prevState.words[id],
          unactive: !prevState.words[id].unactive
        }
      }
    }), () => this.filterKeywords(word, this.state.words[id].unactive))
  }


  render() {
    const { keywords, words } = this.state
    return (
      <Container>
        <Row>
          <Col md={8}>
            {Object.values(keywords).map(keyword =>
              <Keyword
                key={keyword.id}
                // onClick={this.handleKeywordClick}
                {...keyword}
              />
            )}
          </Col>
          <Col md={4}>
            {Object.values(words).map(word =>
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