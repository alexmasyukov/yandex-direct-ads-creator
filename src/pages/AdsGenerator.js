import React, { Component } from 'react'
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"
import AdDescription from "components/adsSettingsForm/AdDescription";
import AdFastLink from "components/adsSettingsForm/AdFastLink";


// import { CSVLink, CSVDownload } from "react-csv";
//
// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["Ahmed", "Tomi", "ah@smthing.co.com"],
//   ["Raed", "Labes", "rl@smthing.co.com"],
//   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];
//
// <CSVLink data={csvData} separator={"  "}>
//   Download me
// </CSVLink>
// // or
// <CSVDownload data={csvData} target="_blank"/>


class AdsGenerator extends Component {
  state = {
    secondTitle: {
      manually: true,
      title: 'второй заголовок'
    },
    descriptions: [
      'Свежие букеты цветов и букеты в шляпных коробках с быстрой доставкой по Чите!'
    ],
    linkUrl: 'https://klumba.store/',
    linkVisible: 'klumba.store',
    fastLinks: [
      {
        title: 'Каталог',
        description: '',
        url: 'https://klumba.store/catalog'
      },
      {
        title: 'Доставка',
        description: '',
        url: 'https://klumba.store/delivery'
      }
    ]
  }

  handleSecondTitleChange = () => {
    this.setState(prevState => ({
      secondTitle: {
        ...prevState.secondTitle,
        manually: !prevState.secondTitle.manually
      }
    }))
  }

  handleDescriptionChange = (index, description) => {
    this.setState(prevState => {
      const descriptions = [...prevState.descriptions]
      descriptions[index] = description
      return {
        descriptions
      }
    })
  }

  handleAddDescription = () => {
    this.setState(prevState => ({
      descriptions: [...prevState.descriptions, '']
    }))
  }

  handleDescriptionDelete = (index) => {
    this.setState(prevState => {
      const descriptions = [...prevState.descriptions]
      descriptions.splice(index, 1)
      return {
        descriptions
      }
    })
  }

  handleInputTextChange = (newState) => {
    this.setState({
      ...newState
    })
  }


  handleFastLinkChange = (index, newState) => {
    this.setState(prevState => {
      const fastLinks = [...prevState.fastLinks]
      fastLinks[index] = { ...fastLinks[index], ...newState }
      return {
        fastLinks
      }
    })
  }

  handleAddFastLink = () => {
    this.setState(prevState => ({
      fastLinks: [...prevState.fastLinks, {
        title: '',
        description: '',
        url: ''
      }]
    }))
  }


  render() {
    const { secondTitle, descriptions, linkUrl, linkVisible, fastLinks } = this.state

    return (
      <Container>
        {/*fluid={true}*/}
        {/*<h5 className="pt-3 pb-0">*/}
          {/*Генерация рекламной компании*/}
        {/*</h5>*/}

        <Row className="pt-3">
          <Col className="pr-1">

            <Card>
              <Card.Header>Объявление</Card.Header>
              <Card.Body>

                <Row>
                  <Col md={12}>
                    <Form.Label>Второй заголовок</Form.Label>
                    <Form.Check
                      type="checkbox"
                      id={`check-api-checkbox`}
                      checked={secondTitle.manually}
                      onChange={this.handleSecondTitleChange}
                      label={`Использовать ручной второй заголовок`}
                      className="pb-3"
                      custom
                    />
                  </Col>
                  {
                    secondTitle.manually &&
                    <Col>
                      <Form.Group>
                        <Form.Control type="text" placeholder="" size="sm"/>
                        <Form.Text className="text-muted">
                          Максимум 30 символов
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  }
                </Row>

                {
                  descriptions.map((description, i) =>
                    <AdDescription
                      key={i}
                      index={i}
                      description={description}
                      onChange={this.handleDescriptionChange}
                      onDelete={this.handleDescriptionDelete}
                    />
                  )
                }

                <Form.Group>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={this.handleAddDescription}
                  >
                    + Добавить описание
                  </Button>
                </Form.Group>

                <Row>
                  <Col className="pr-1">
                    <Form.Group>
                      <Form.Label>Ссылка</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={linkUrl}
                        onChange={e => this.handleInputTextChange({ linkUrl: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="pl-1">
                    <Form.Group>
                      <Form.Label>Отображаемая ссылка</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={linkVisible}
                        onChange={e => this.handleInputTextChange({ linkVisible: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

              </Card.Body>
            </Card>

          </Col>

          <Col className="pl-2">

            <Card>
              <Card.Header>Быстрые ссылки</Card.Header>
              <Card.Body>
                {
                  fastLinks.map((link, i) =>
                    <AdFastLink
                      key={i}
                      index={i}
                      onChange={this.handleFastLinkChange}
                      title={link.title}
                      url={link.url}
                    />
                  )
                }

                {
                  fastLinks.length < 4 &&
                  <Form.Group>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={this.handleAddFastLink}
                    >
                      + Добавить быструю ссылку
                    </Button>
                  </Form.Group>
                }

              </Card.Body>
            </Card>

          </Col>
        </Row>

        <Row className="pt-4">
          <Col>
            <Button variant="outline-success">Сгенерировать объявления</Button>
          </Col>
        </Row>


      </Container>
    )
  }
}

export default AdsGenerator