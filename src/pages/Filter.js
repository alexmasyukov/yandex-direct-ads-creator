import React, { Component } from 'react'
import Word from "components/Filter/Word"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Keyword from "components/Filter/Keyword"
import Panel from "components/Filter/Panel"

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

]


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
    this.handleCopyKeywords = this.handleCopyKeywords.bind(this)
    this.handleCopyMinusWords = this.handleCopyMinusWords.bind(this)
    this.importKeywordsFromClipboard = this.importKeywordsFromClipboard.bind(this)
  }

  state = {
    keywords: [],
    words: []
  }

  setKeywords(initialKeywords) {
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
    this.importSampleKeywords()
  }

  importSampleKeywords() {
    this.setKeywords(initialKeywords)
  }

  importKeywordsFromClipboard() {
    const app = this
    navigator.clipboard.readText()
      .then(text => {
        app.setKeywords(text.split('\n'))
      })
      .catch(err => {
        // возможно, пользователь не дал разрешение на чтение данных из буфера обмена
        // console.log('Something went wrong', err);
        console.log('Не могу прочитать текст из буфера обмена', err)
      })
  }

  // todo После нажатия на включение слова,
  //  нужно проверять все слова в его ключевике на другие отключенные слова,
  //  если они есть, не включаем его обратно

  filterWords() {
    const wordsByOnlyActiveKeywords = Array.from(new Set(
      this.state.keywords.reduce(function (values, item) {
        (item.unactive === false) && values.push(item.keyword)
        return values
      }, []).join(' ').split(' ')
    ))

    const oldWords = [...this.state.words]
    const words = oldWords.map(item => {
      item.isNotUse = !wordsByOnlyActiveKeywords.includes(item.word)
      return item
    })

    this.setState({
      words
    })
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

  getMinusWords() {
    return this.state.words.filter(word => word.unactive === true)
  }

  getActiveKeywords() {
    return this.state.keywords.filter(keyword => keyword.unactive === false)
  }

  convertMinusWordsToText(words) {
    return words.map(word => word.word).join('\r')
  }

  convertActiveKeywordsToText(keywords) {
    return keywords.map(word => word.keyword).join('\r')
  }

  copyToClipboard(text) {
    const textField = document.createElement('textarea')
    textField.value = text !== '' ? text : 'нет минус слов'
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  handleCopyKeywords() {
    this.copyToClipboard(this.convertActiveKeywordsToText(this.getActiveKeywords()))
  }

  handleCopyMinusWords() {
    this.copyToClipboard(this.convertMinusWordsToText(this.getMinusWords()))
  }

  render() {
    const { keywords, words } = this.state
    const minusWords = this.getMinusWords()
    const activeKeywords = this.getActiveKeywords()
    return (
      <>
        <Panel
          minusWordsCount={minusWords.length}
          activeKeywordsCount={activeKeywords.length}
          onClickCopyKeywords={this.handleCopyKeywords}
          onClickCopyMinusWords={this.handleCopyMinusWords}
          onClickInmportKeywords={this.importKeywordsFromClipboard}
        />
        <Container>
          <Row>
            <Col md={7}>
              <h6>Ключевые фразы</h6>
              <hr/>
              {keywords.map(keyword =>
                <Keyword
                  key={keyword.id}
                  {...keyword}
                />
              )}
            </Col>
            <Col md={3}>
              <h6>Минус слова</h6>
              <hr/>
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
      </>
    )
  }
}

export default Filter