import React, { FC, useCallback, useEffect, useRef, MouseEvent } from 'react'
// import { Steps, Row, Col } from "antd"
// import "antd/dist/antd.css"
import styles from 'components/app.module.sass'
import { useWindowDimensions } from './useWindowDimensions'

// const { Step } = Steps

// interface Props {
//   current: number
//   keywordsCount: number
//   stopwordsCount: number
//   adsCount: number
//   hanleChange(current: number): void
// }

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

// function useMouse() {
//   const handleMouseDown = (event: MouseEvent) => {
//     console.log(event)

//     // if (mapRef.current) {
//     //   mapRef.current.style.transform = 'translate3d(0px, 0px, 0px)'
//     // }

//     console.log('mouse down')
//   }

//   const ref = useCallback((node: HTMLDivElement) => {
//     if (node) {
//       console.log('node +', node)

//   // let i = false
//   // const [test, ref] = useMouse()
//   // const [test, setTest] = useState(false)
//       // return node
//       // node.addEventListener('mousedown', handleMouseDown)
//       // node.style.transform = 'translate3d(0px, 0px, 0px)'
//     }
//   }, [])

//   return [null, ref]
// }

interface MapDrag {
  current: {
    isDrag: boolean
    startDragX: number
    startDragY: number
    tx: number
    ty: number
  }
}

interface MapConfig {
  width: number
  height: number
}

const mapConfig: MapConfig = {
  width: 2321,
  height: 2662
}

const Map = () => {
  const windowDimensions = useWindowDimensions()

  const mapDrag: MapDrag = useRef({
    isDrag: false,
    startDragX: 0,
    startDragY: 0,
    tx: -700,
    ty: -1000
  })

  const handleMouseEvent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    const map = event.target as HTMLDivElement

    if (event.type === 'mousedown') {
      map.classList.add(styles.mapDrag)

      mapDrag.current = {
        ...mapDrag.current,
        startDragX: event.clientX,
        startDragY: event.clientY,
        isDrag: true
      }
    }

    const indentX = mapDrag.current.startDragX - event.clientX
    const indentY = mapDrag.current.startDragY - event.clientY
    let tx = mapDrag.current.tx - indentX
    let ty = mapDrag.current.ty - indentY

    if (
      (event.type === 'mouseup' || event.type === 'mouseleave') &&
      mapDrag.current.isDrag
    ) {
      map.classList.remove(styles.mapDrag)

      mapDrag.current = {
        ...mapDrag.current,
        tx,
        ty,
        isDrag: false
      }
    }

    if (event.type === 'mousemove' && mapDrag.current.isDrag) {
      const minX = mapConfig.width - windowDimensions.width
      const minY = mapConfig.height - windowDimensions.height

      if (tx > 0) {
        tx = 0
        mapDrag.current.tx = 0
      }

      if (ty > 0) {
        ty = 0
        mapDrag.current.ty = 0
      }

      if (tx <= -minX) {
        tx = -minX
        mapDrag.current.tx = -minX
      }

      if (ty <= -minY) {
        ty = -minY
        mapDrag.current.ty = -minY
      }

      map.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`
    }

    event.preventDefault()

    // console.log(
    //   'MOVING !!! clientX',
    //   event.clientX,
    //   'current.tx',
    //   mapDrag.current.tx,
    //   'tx',
    //   tx
    // )
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
