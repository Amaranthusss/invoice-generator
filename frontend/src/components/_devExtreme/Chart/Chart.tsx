import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import Chart from 'devextreme-react/chart'

import { IChartOptions } from './Chart.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const ChartPattern = (props: IOptions<IChartOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <Chart {...props.options} width={width} height={height} />
    </div>
  )
}

export default ChartPattern
