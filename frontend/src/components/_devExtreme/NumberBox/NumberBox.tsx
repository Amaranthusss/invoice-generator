import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { NumberBox } from 'devextreme-react'

import { INumberBoxOptions } from './NumberBox.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const ButtonPattern = (props: IOptions<INumberBoxOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  //ToDo: Looks like devex bug at showSpinButtons param changes - DOM is not clean

  return (
    <div className={resizeDetector.box} ref={ref}>
      <NumberBox {...props.options} width={width} height={height} />
    </div>
  )
}

export default ButtonPattern
