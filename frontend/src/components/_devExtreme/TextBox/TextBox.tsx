import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { TextBox } from 'devextreme-react'

import { ITextBoxOptions } from './TextBox.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const TextBoxPattern = (props: IOptions<ITextBoxOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <TextBox {...props.options} width={width} height={height} />
    </div>
  )
}

export default TextBoxPattern
