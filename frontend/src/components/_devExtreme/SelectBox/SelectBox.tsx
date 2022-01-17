import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { SelectBox } from 'devextreme-react'

import { ISelectBoxOptions } from './SelectBox.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const SelectBoxPattern = (props: IOptions<ISelectBoxOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <SelectBox {...props.options} width={width} height={height} />
    </div>
  )
}

export default SelectBoxPattern
