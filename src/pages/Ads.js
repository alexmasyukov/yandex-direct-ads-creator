import React, { Component } from 'react'
import { connect } from "react-redux"
import { Container, Form, Button, Card, Row, Col, Spinner } from "react-bootstrap"
import AdDescription from "components/adsSettingsForm/AdDescription"
import AdFastLink from "components/adsSettingsForm/AdFastLink"
import { companyTableTitles } from "constants/companyTableTitles"
import { setAdsPageCache } from 'store/actions/action'

// const Ads = () => {
//   return (
//     <Container className="pt-4">
//       <h4>Шаг 1. Формируем заголовки</h4>
//       <TitleSettingForm className="pb-2"/>
//       <TitlesTable/>
//     </Container>
//   )
// }

class Ads extends Component {
  state = {
    ...this.props.adsPageCache
  }

  componentDidMount() {
    this.handleCreateAds()
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.setAdsPageCache({ ...this.state })
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

  handleFastLinkDelete = (index) => {
    this.setState(prevState => {
      const fastLinks = [...prevState.fastLinks]
      fastLinks.splice(index, 1)
      return {
        fastLinks
      }
    })
  }

  getTitles = () => this.props.titlesDataGridCache.map(row => row.c3 || '')
  extractKeywords = (object) =>  object.map(row => row.c1 || '')


  handleCreateAds = () => {
    this.setState({
      adsGenerationProcess: true,
    })

    const titles = this.getTitles()

    const fastLinkTitles = this.state.fastLinks
      .map((item) => item.title.trim())
      .join('||')

    const fastLinkUrls = this.state.fastLinks
      .map((item) => item.url.trim())
      .join('||')

    const ads = []
    ads.push(companyTableTitles)


    const keywords = this.extractKeywords(this.props.titlesDataGridCache)
    keywords.forEach((keyword, adIndex) => {
        this.state.descriptions.forEach((description, descIndex) => {
          ads.push(
            this.generateAd({
              additionalAds: !!descIndex,
              groupName: this.getGroupName(keyword, adIndex),
              groupIndex: adIndex,
              companyName: this.state.companyName.trim(),
              keyword,
              title1: titles[adIndex],
              title2: '',
              description,
              linkUrl: this.state.linkUrl,
              linkVisible: this.state.linkVisible,
              region: this.state.region.trim(),
              fastLinkTitles,
              fastLinkUrls,
              corrections: ['Только свежие цветы', 'Учтем пожелания', 'Круглосуточная доставка']
              //Вернём деньги за доставку, если опоздаем более 5 минут.//Доставляем без опозданий
            })
          )
        })
      }
    )

    const csv = ads
      .map(row => row.join('\t'))
      .join('\r')

    setTimeout(() =>
        this.setState({
          csv,
          ads,
          adsGenerationProcess: false,
          lastTimeGeneratedAds: new Date().toTimeString().replace(/ .*/, '')
        })
      , 300)
  }


  getGroupName = (keyword, index) =>
    keyword
      .toLowerCase()
      .replace(' ', '_')
      .replace(' ', '_')
      .replace(' ', '_')
      .replace('\t', '_')
      .replace('\r', '_')
      .replace('\n', '_')
    + '_'
    + index


  generateAd({
               additionalAds = false,
               groupName,
               groupIndex,
               companyName,
               keyword,
               title1,
               title2,
               description,
               linkUrl,
               linkVisible,
               region,
               fastLinkTitles,
               fastLinkUrls,
               corrections
             }) {
    return [
      additionalAds ? '+' : '-',
      'Текстово-графическое',
      '-',
      groupName, // Название группы
      groupIndex,
      'Текстово-графическая',
      companyName,
      'RUB',
      keyword,
      title1,
      title2,
      description,
      linkUrl,
      linkVisible,
      region,
      5,
      1,
      'Идут показы',
      'Работает везде',
      fastLinkTitles,
      '',
      fastLinkUrls,
      corrections.join('||')
    ]
  }


  render() {
    const { secondTitle, descriptions, linkUrl, linkVisible, fastLinks } = this.state

    return (
      <>
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

                  {
                    descriptions.length < 4 &&
                    <Form.Group>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={this.handleAddDescription}
                      >
                        + Добавить описание
                      </Button>
                    </Form.Group>
                  }

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
                        onDelete={this.handleFastLinkDelete}
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

              <Card className="mt-2">
                <Card.Header>Компания</Card.Header>
                <Card.Body>

                  <Row>
                    <Col md={6} className="pr-1">
                      <Form.Group>
                        <Form.Label>Название компании</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.companyName}
                          onChange={e => this.handleInputTextChange({ companyName: e.target.value })}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="pl-1 pr-2">
                      <Form.Group>
                        <Form.Label>Регион</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.region}
                          onChange={e => this.handleInputTextChange({ region: e.target.value })}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>

            </Col>
          </Row>

          <Row className="pt-4 align-items-end">
            <Col>
              <Button
                variant="outline-success"
                onClick={this.handleCreateAds}
                disabled={this.state.adsGenerationProcess}
              >
                {
                  this.state.adsGenerationProcess ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    `Сгенерировать объявления`
                  )
                }
              </Button>
              {
                !this.state.adsGenerationProcess && this.state.ads.length &&
                <span
                  className="generatedResultLabel">Объявлений: <b>{this.state.ads.length}</b>, последняя генерация в <b>{this.state.lastTimeGeneratedAds}</b></span>
              }
            </Col>
          </Row>


        </Container>
        <Container fluid={true} className="pt-5">
          <Form.Control
            as="textarea"
            rows="3"
            onChange={(e) => e.preventDefault()}
            onClick={(e) => {
              e.target.select()
              document.execCommand("copy")
            }}
            value={this.state.csv}
          />
        </Container>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    adsPageCache: state.adsPageCache,
    titlesDataGridCache: state.titlesDataGridCache,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdsPageCache: cache => dispatch(setAdsPageCache(cache))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ads)