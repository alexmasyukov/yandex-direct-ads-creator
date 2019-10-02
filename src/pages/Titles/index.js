import React, { PureComponent } from 'react';
import * as dataGridHandlers from 'utils/dataGridHandlers'
import { oneKeywords } from "data/oneKeywords"
import { Card, Col, Container, Form, Row } from "react-bootstrap"
import Table from "pages/Titles/Table"
import { prepareData } from "data/simpleData";
import TitlesText from "pages/Titles/TitlesText";


class TitleGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this)

    console.log(this.props.titles);
  }

  state = {
    keywords: oneKeywords,
    maxOneTitleLenght: 35,
    maxTwoTitleLenght: 30,
    deleteNeedless: [
      'в',
      'на',
      'из',
      'в интернет',
      'для',
      'ru',
      'ру',
      'с',
      'по',
      'и',
      'м',
      'интернет',
      'в интернете',
      'интернете',
      'от',
      'россия'
    ],
    addNeedless: [
      '! Недорого!',
      '! Дешево!',
      '!'
    ],
    firstToUpperCase: [
      'чита'
    ],
    titles: []
  }


  get displayValueHandlers() {
    return {
      c1: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
      c2: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
      c3: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
      // c4: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
    }
  }

  get valueHandlers() {
    return {
      c2: dataGridHandlers.deleteNeedless(this.state.maxOneTitleLenght, this.state.deleteNeedless),
      c3: dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)
      // c3: dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)
    }
  }


  processedKeywords(keywords) {
    const prepared = prepareData(keywords)
    const c2_handler = dataGridHandlers.deleteNeedless(this.state.maxOneTitleLenght, this.state.deleteNeedless)
    const c3_handler = dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)

    const firstToUpperCase = text => text[0].toUpperCase() + text.slice(1)
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


  datagridDidUpdate = (data) => {
    const newTitles = data.map(row =>
      row.c3 + '|' + ('c4' in row ? row.c4 : '')
    )

    console.log(newTitles);

    this.props.dataUpdateAction(newTitles)

  }

  render() {
    return (
      <>
        <Container>
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
                          value={this.state.maxOneTitleLenght}
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
                          value={this.state.maxTwoTitleLenght}
                          onChange={e => this.handleInputTextChange({ maxTwoTitleLenght: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="col-12">
                      <b>Пример первого:</b>
                      <p>{dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght)('заказать цветы с доставкой в чите недорого')}</p>

                      <b>Пример второго:</b>
                      <p>{dataGridHandlers.highlightMaxLength(this.state.maxTwoTitleLenght)('заказать цветы с доставкой в чите недорого')}</p>
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
                        value={this.state.deleteNeedless.join('\n')}
                        onChange={e => this.handleInputTextChange({ deleteNeedless: e.target.value.split('\n') })}
                      />
                    </Col>

                    <Col className="col-md-3 pl-1">
                      <Form.Label>Дополнить заголовок, <br/>если осталось место</Form.Label>
                      <Form.Control
                        as="textarea"
                        cols="30"
                        rows="6"
                        value={this.state.addNeedless.join('\n')}
                        onChange={e => this.handleInputTextChange({ addNeedless: e.target.value.split('\n') })}
                      />
                    </Col>

                    <Col className="col-md-3 pl-1">
                      <Form.Label>Сделать с заглавной буквы</Form.Label>
                      <Form.Control
                        as="textarea"
                        cols="30"
                        rows="6"
                        value={this.state.firstToUpperCase.join('\n')}
                        onChange={e => this.handleInputTextChange({ firstToUpperCase: e.target.value.split('\n') })}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>


        <Container>
          <TitlesText />
        </Container>


        <Container className="pt-4">
          <Table
            data={this.processedKeywords(oneKeywords)}
            displayValueHandlers={this.displayValueHandlers}
            valueHandlers={this.valueHandlers}
          />
        </Container>
      </>
    );
  }
}

export default TitleGenerator;