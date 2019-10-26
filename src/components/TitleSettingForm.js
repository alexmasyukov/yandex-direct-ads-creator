import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "store/actions/action"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import * as dataGridHandlers from "utils/dataGridHandlers"
import { prepareData } from "data/simpleData"
import { firstToUpperCase } from "utils/util"

class TitleSettingForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.handleStartProcess = this.handleStartProcess.bind(this)
  }

  state = {
    ...this.props.titlesPageCache
  }

  componentDidMount() {
    if (!this.props.titlesPageCache.data.length) {
      this.handleStartProcess()
    }
  }

  componentWillUnmount() {
    this.props.setTitlesPageCache({ ...this.state })
  }

  processedKeywords(keywords) {
    const prepared = prepareData(keywords)
    const c2_handler = dataGridHandlers.deleteNeedless(this.state.maxOneTitleLenght, this.state.deleteNeedless)
    const c3_handler = dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)

    return prepared.map(row => {
        row.c2 = firstToUpperCase(c2_handler('', row.c1))
        row.c3 = c3_handler('', row.c2)
        return row
      }
    )
  }

  handleInputTextChange = (newState) => {
    this.setState({
      ...newState
    })
  }

  handleStartProcess = () => {
    this.props.setTitlesDatagridCache(
      [...this.processedKeywords(this.state.keywords)]
    )
    // this.props.setData(
    //   this.processedKeywords(this.state.keywords)
    // )
  }

  render() {
    const {
      maxOneTitleLenght,
      maxTwoTitleLenght,
      deleteNeedless,
      addNeedless,
      firstToUpperCase,
      keywords
    } = this.state

    return (
      <Row className="pt-3 pb-4">
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
                <Col md={5} className="pr-1">
                  <Form.Label>2. Обрезать первый заголовок по этим словам</Form.Label>
                  <Form.Control
                    as="textarea"
                    cols="30"
                    rows="6"
                    value={deleteNeedless.join('\n')}
                    onChange={e => this.handleInputTextChange({ deleteNeedless: e.target.value.split('\n') })}
                  />
                </Col>

                <Col md={3} className="pl-1 pr-1">
                  <Form.Label>2. Сделать с заглавной буквы</Form.Label>
                  <Form.Control
                    as="textarea"
                    cols="30"
                    rows="6"
                    value={firstToUpperCase.join('\n')}
                    onChange={e => this.handleInputTextChange({ firstToUpperCase: e.target.value.split('\n') })}
                  />
                </Col>

                <Col md={4} className="pl-1">
                  <Form.Label>3. Дополнить заголовок, <br/>если осталось место</Form.Label>
                  <Form.Control
                    as="textarea"
                    cols="30"
                    rows="6"
                    value={addNeedless.join('\n')}
                    onChange={e => this.handleInputTextChange({ addNeedless: e.target.value.split('\n') })}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>


        <Col md={12} className="pt-2 pb-2">

          <Form.Control
            className="pb-1"
            as="textarea"
            cols="30"
            rows="6"
            value={keywords.join('\n')}
            onChange={e => this.handleInputTextChange({ keywords: e.target.value.split('\n') })}
          />
        </Col>
        <Col pt={4}>

          <Button
            variant="outline-success"
            onClick={this.handleStartProcess}
            className="mt-2"
          >
            Обработать ключи
          </Button>

        </Col>
      </Row>

    )
  }
}

function mapStateToProps(state) {
  return {
    titlesPageCache: state.titlesPageCache
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTitlesPageCache: cache => dispatch(actions.setTitlesPageCache(cache)),
    setTitlesDatagridCache: cache => dispatch(actions.setTitlesDatagridCache(cache))
    // setData: data => dispatch(actions.setData(data)),
    // updateFormField: (object) => dispatch(actions.updateFormField(object)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleSettingForm)