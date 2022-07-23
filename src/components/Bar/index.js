import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()
  const chartInit = () => {
    const myChart = echarts.init(domRef.current)
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'number',
          type: 'bar',
          data: yData
        }
      ]
    }, true)
  }
  useEffect(() => {
    chartInit()
  }, [domRef.current])
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )

}
export default Bar

