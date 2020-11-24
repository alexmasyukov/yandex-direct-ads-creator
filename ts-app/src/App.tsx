import React, {
  FC,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react'
// import { Steps, Row, Col } from "antd"
// import "antd/dist/antd.css"
import styles from 'components/app.module.sass'

// const { Step } = Steps

interface Props {
  current: number
  keywordsCount: number
  stopwordsCount: number
  adsCount: number
  hanleChange(current: number): void
}

// const AllSteps: FC<Props> = (props) => {
//   return (
//     <Steps
//       direction="vertical"
//       current={props.current}
//       onChange={props.hanleChange}
//     >
//       <Step
//         title="Фильтрация ключей"
//         description={`Ключей: ${props.keywordsCount} \nМинус-слов: ${props.stopwordsCount}`}
//       />
//       <Step
//         title="Генерация заголовков"
//         description="Настройте заголовки, описания и дополнения"
//       />
//       <Step title="Результат" description={`Объявлений: ${props.adsCount}`} />
//     </Steps>
//   )
// }

// function App() {
//   const [currentStep, setCurrentStep] = useState(0)

//   return (
//     <Row gutter={[16, 24]}>
//       <Col className="gutter-row" span={6}>
//         <AllSteps
//           current={currentStep}
//           keywordsCount={0}
//           stopwordsCount={0}
//           adsCount={0}
//           hanleChange={(current) => setCurrentStep(current)}
//         />
//       </Col>
//       <Col className="gutter-row" span={6}>
//         dsfsfsf
//       </Col>
//     </Row>
//   )
//

// type DivProps = React.ComponentPropsWithoutRef<'div'>
// React.forwardRef<HTMLDivElement, DivProps>

// const Map = () => {
//   const mapRef = useRef<HTMLDivElement>(null)

//   const handleMouseDown = (event: MouseEvent) => {
//     if (mapRef.current) {
//       mapRef.current.style.transform = 'translate3d(0px, 0px, 0px)'
//     }

//     console.log('mouse down')
//   }

//   useEffect(() => {
//     const a = mapRef.current
//     console.log(mapRef)
//     if (a) {
//       a.addEventListener('mousedown', handleMouseDown)

//     }

//     return () => {
//       if (a) {
//         a.removeEventListener('mousedown', handleMouseDown)
//       }
//     }
//   }, [])

//   return (
//     <div className={styles.map} ref={mapRef}>
//       map
//     </div>
//   )
// }

function useMouse() {
  const handleMouseDown = (event: MouseEvent) => {
    console.log(event)

    // if (mapRef.current) {
    //   mapRef.current.style.transform = 'translate3d(0px, 0px, 0px)'
    // }

    console.log('mouse down')
  }

  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      console.log('node +', node)

      // return node
      // node.addEventListener('mousedown', handleMouseDown)
      // node.style.transform = 'translate3d(0px, 0px, 0px)'
    }
  }, [])

  return [null, ref]
}

interface MapDrag {
  current: {
    x: number
    y: number
    startDragX: number
    startDragY: number
    isDrag: boolean
  }
}

const Map = () => {
  const mapDrag: MapDrag = useRef({
    x: -700,
    y: -1000,
    startDragX: 0,
    startDragY: 0,
    isDrag: false,
  })
  // let i = false
  // const [test, ref] = useMouse()
  // const [test, setTest] = useState(false)

  const handleMouseEvent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (event.type === 'mousedown') {
      mapDrag.current = {
        ...mapDrag.current,
        startDragX: event.clientX,
        startDragY: event.clientY,
        isDrag: true,
      }
      console.log('mousedown !!!!!')
    }

    if (event.type === 'mouseup' || event.type === 'mouseleave') {
      const indentX = mapDrag.current.startDragX - event.clientX
      const indentY = mapDrag.current.startDragY - event.clientY
      const { x, y } = mapDrag.current

      mapDrag.current = {
        ...mapDrag.current,
        x: x - indentX,
        y: y - indentY,
        isDrag: false,
      }
    }

    if (event.type === 'mousemove' && mapDrag.current.isDrag) {
      const indentX = mapDrag.current.startDragX - event.clientX
      const indentY = mapDrag.current.startDragY - event.clientY
      const { x, y } = mapDrag.current

      const a = event.target as HTMLDivElement
      console.log(a.style.transform)

      a.style.transform = `translate3d(${x - indentX}px, ${y - indentY}px, 0px)`

      console.log(
        'MOVING !!! clientX',
        event.clientX,
        'current.x',
        mapDrag.current.x,
        'x',
        x
      )
    }

    // console.log(event.type, isDrag.current)

    // console.log('handleMouseMove')

    event.preventDefault()
  }, [])

  useEffect(() => {
    console.log('render', mapDrag.current.isDrag)
  })

  return (
    <div
      className={styles.map}
      // ref={ref}
      onMouseMove={handleMouseEvent}
      onMouseDown={handleMouseEvent}
      onMouseUp={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      map
    </div>
  )
}

function App() {
  // const mapRef = React.createRef<HTMLDivElement>()

  // useEffect(() => {
  //   console.log(mapRef)
  //   if (mapRef.current) {
  //     mapRef.current.style.transform = 'translate3d(0px, 0px, 0px)'
  //   }
  // }, [])

  return (
    <div className={styles.container}>
      <Map />
    </div>
  )
}

export default App
