import React, { Component } from 'react'
import Word from "components/Filter/Word"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Keyword from "components/Filter/Keyword"
import Panel from "components/Filter/Panel"

import { simpleFilterKeywords } from 'data/simpleFilterKeywords'
import KeywordsList from "components/Filter/KeywordsList";

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
    this.handleWordMouseEnter = this.handleWordMouseEnter.bind(this)
  }

  state = {
    keywords: [],
    words: [],
    keywordsOfSelectWord: []
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
    const words =
      Array
        .from(new Set(
          getValuesByKey('keyword', this.state.keywords).join(' ').split(' ')
        ))
        .sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1)
        .map((word, i) => ({
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
    this.setKeywords(simpleFilterKeywords)
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

  handleWordMouseEnter(word) {
    this.setState(prevState => ({
      keywordsOfSelectWord: prevState.keywords.filter(keyword =>
        keyword.keyword.trim().split(' ').includes(word))
    }))
    // console.log(word)
  }

  render() {
    const { keywords, words, keywordsOfSelectWord } = this.state
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
              <div style={{position: 'fixed', top: 10, left: 20}}>
                <h6>Ключевые фразы ({keywordsOfSelectWord.length})</h6>
                {/*<hr/>*/}
                {/*{keywords.map(keyword =>*/}
                {/*<Keyword*/}
                {/*key={keyword.id}*/}
                {/*{...keyword}*/}
                {/*/>*/}
                {/*)}*/}
                <KeywordsList
                  keywords={keywordsOfSelectWord}
                />
              </div>
            </Col>
            <Col md={3}>
              <h6>Слова ({words.length})</h6>
              <hr/>
              {words.map(word =>
                <Word
                  key={word.id}
                  onClick={this.handleWordClick}
                  onMouseEnter={this.handleWordMouseEnter}
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