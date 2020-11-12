import React, { FC, useState } from "react"
import { Steps, Row, Col } from "antd"
import "antd/dist/antd.css"
import "./App.css"

const { Step } = Steps

interface Props {
  current: number
  keywordsCount: number
  adsCount: number
  hanleChange(current: number): void
}

const AllSteps: FC<Props> = (props) => {
  return (
    <Steps
      direction="vertical"
      current={props.current}
      onChange={props.hanleChange}
    >
      <Step
        title="Ключевики"
        description={`Всего ключевиков: ${props.keywordsCount}`}
      />
      <Step
        title="Объявления"
        description="Настройте заголовки, описания и дополнения"
      />
      <Step title="Результат" description={`Объявлений: ${props.adsCount}`} />
    </Steps>
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={6}>
        <AllSteps
          current={currentStep}
          keywordsCount={0}
          adsCount={0}
          hanleChange={(current) => setCurrentStep(current)}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        dsfsfsf
      </Col>
    </Row>
  )
}

export default App
