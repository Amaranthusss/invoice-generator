import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { Button } from 'devextreme-react'
import { ClickEvent } from 'devextreme/ui/button'
import _ from 'lodash'

import dxService from '../devExtreme.service'

import { IButtonOptions } from './Button.interface'
import { IOptions } from '../../components.interface'

import { buttonSizeLimits } from './Button.config'

import resizeDetector from '../resizeDetector.module.css'

const ButtonPattern = (props: IOptions<IButtonOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  const getTextForHigherWidth = (): string | undefined => {
    if (width != null && width >= buttonSizeLimits.min) {
      return props.options.text
    }

    return
  }

  return (
    <div className={resizeDetector.box} ref={ref}>
      <Button
        {...props.options}
        width={width}
        height={height}
        text={getTextForHigherWidth()}
				focusStateEnabled={false}
        onClick={(e: ClickEvent) =>
          dxService.callFromProps(props, 'onClick', e)
        }
      />
    </div>
  )
}

export default ButtonPattern
