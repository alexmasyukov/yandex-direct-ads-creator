import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setData, updateKeywords } from "store/actions/action"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import * as dataGridHandlers from "utils/dataGridHandlers"
import { prepareData } from "data/simpleData"
import { firstToUpperCase } from "utils/util"

class SettingForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.handleStartProcess = this.handleStartProcess.bind(this)
  }

  state = {
    keywords: []
  }

  processedKeywords(keywords) {
    const prepared = prepareData(keywords)
    const c2_handler = dataGridHandlers.deleteNeedless(this.props.maxOneTitleLenght, this.props.deleteNeedless)
    const c3_handler = dataGridHandlers.addNeedless(this.props.maxOneTitleLenght, this.props.addNeedless)

    return prepared.map(row => {
        row.c2 = firstToUpperCase(c2_handler('', row.c1))
        row.c3 = c3_handler('', row.c2)
        return row
      }
    )
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.handleStartProcess()
    }
  }

  handleInputTextChange = (newState) => {
    this.setState({
      ...newState
    })
  }

  handleStartProcess = () => {
    this.props.setData(
      this.processedKeywords(this.props.keywords)
    )
  }

  render() {
    const {
      maxOneTitleLenght,
      maxTwoTitleLenght,
      deleteNeedless,
      addNeedless,
      toUpperFirstCase
    } = this.props

    return (
      <>
        <Row className="pt-3">
          <Col className="col-md-4 pr-1">
            <Card>
              <Card.Header>Максимальная длинна </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="pr-1">
                    <Form.Group>
                      <Form.Label>Первый заголовок</Form.Label>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={maxOneTitleLenght}
                        onChange={e => this.handleInputTextChange({ maxOneTitleLenght: e.target.value })}
                      />
                    </Form.Group>
                  </Col>

                  <Col className="pl-1">
                    <Form.Group>
                      <Form.Label>Второй заголовок</Form.Label>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={maxTwoTitleLenght}
                        onChange={e => this.handleInputTextChange({ maxTwoTitleLenght: e.target.value })}
                      />
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <b>Пример первого:</b>
                    <p>{dataGridHandlers.highlightMaxLength(maxOneTitleLenght)('заказать цветы с доставкой в чите недорого')}</p>

                    <b>Пример второго:</b>
                    <p>{dataGridHandlers.highlightMaxLength(maxTwoTitleLenght)('заказать цветы с доставкой в чите недорого')}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col className="col-md-8 pl-1">
            <Card>
              <Card.Header>Обработка заголовков</Card.Header>
              <Card.Body>
                <Row>
                  <Col className="col-md-5 pr-1">
                    <Form.Label>Обрезать первый заголовок по этим словам</Form.Label>
                    <Form.Control
                      as="textarea"
                      cols="30"
                      rows="6"
                      value={deleteNeedless.join('\n')}
                      onChange={e => this.handleInputTextChange({ deleteNeedless: e.target.value.split('\n') })}
                    />
                  </Col>

                  <Col className="col-md-3 pl-1">
                    <Form.Label>Дополнить заголовок, <br/>если осталось место</Form.Label>
                    <Form.Control
                      as="textarea"
                      cols="30"
                      rows="6"
                      value={addNeedless.join('\n')}
                      onChange={e => this.handleInputTextChange({ addNeedless: e.target.value.split('\n') })}
                    />
                  </Col>

                  <Col className="col-md-3 pl-1">
                    <Form.Label>Сделать с заглавной буквы</Form.Label>
                    <Form.Control
                      as="textarea"
                      cols="30"
                      rows="6"
                      value={toUpperFirstCase.join('\n')}
                      onChange={e => this.handleInputTextChange({ firstToUpperCase: e.target.value.split('\n') })}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Form.Control
          className=""
          as="textarea"
          cols="30"
          rows="6"
          value={this.props.keywords.join('\n')}
          onChange={e => this.props.handleChangeKeywords(e.target.value.split('\n'))}
        />

        <Form.Group>
          <Button
            variant="success"
            onClick={this.handleStartProcess}
          >
            Обработать ключи
          </Button>
        </Form.Group>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    keywords: state.keywords,
    maxOneTitleLenght: state.maxOneTitleLenght,
    maxTwoTitleLenght: state.maxTwoTitleLenght,
    addNeedless: state.addNeedless,
    deleteNeedless: state.deleteNeedless,
    toUpperFirstCase: state.toUpperFirstCase
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData: data => dispatch(setData(data)),
    handleChangeKeywords: keywords => dispatch(updateKeywords(keywords))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingForm)