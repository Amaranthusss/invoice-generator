import { useResizeDetector } from 'react-resize-detector'
import { Button } from 'devextreme-react'
import { ClickEvent } from 'devextreme/ui/button'

import dxService from '../dxService'

import { IButtonOptions } from './Button.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const ButtonWrapper = (props: IOptions<IButtonOptions>): JSX.Element => {
  const { width, height, ref } = useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <Button
        {...props.options}
        width={width}
        height={height}
        onClick={(e: ClickEvent) =>
          dxService.callFromProps(props, 'onClick', e)
        }
      />
    </div>
  )
}

export default ButtonWrapper
