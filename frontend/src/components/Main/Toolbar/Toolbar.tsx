import { Popup, ToolbarItem } from 'devextreme-react/popup'
import { useRef, useState } from 'react'
import { ClickEvent } from 'devextreme/ui/button'
import DateBox from '../../devExtreme/DateBox/DateBox'
import Button from '../../devExtreme/Button/Button'
import _ from 'lodash'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getAppSize } from '../../../Redux-store/global.reducer'

import { IDateBoxOptions } from '../../devExtreme/DateBox/DateBox.interface'
import { IButtonOptions } from '../../devExtreme/Button/Button.interface'
import { IAppSize } from '../../../Redux-store/global.reducer.interface'

import { defaultPopupSize } from './Toolbar.config'
import { Enums } from '../../../constants/enums'

import styles from './Toolbar.module.css'

const Toolbar = (): JSX.Element => {
  const [popupVisible, setPoppVisible] = useState<boolean>()
  const popupSize = useRef<IAppSize>(defaultPopupSize)

  const appSizeEqualityFn = (nextAppSize: IAppSize): boolean => {
    popupSize.current = {
      width: !_.isUndefined(nextAppSize.width)
        ? nextAppSize.width * 0.8
        : defaultPopupSize.width,
      height: !_.isUndefined(nextAppSize.height)
        ? nextAppSize.height * 0.8
        : defaultPopupSize.height,
    }
    return true
  }

  useAppSelector(getAppSize, appSizeEqualityFn)

  const dateBoxOptions: IDateBoxOptions = {
    type: 'date',
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
  }

  const generateInvoiceButtonOptions: IButtonOptions = {
    icon: 'product',
    hint: Enums.InterfaceTexts.generateInvoiceButton,
    stylingMode: 'contained',
    type: 'default',
    onClick: (e: ClickEvent) => {
      setPoppVisible(true)
    },
  }

  const sendEmailPopupButtonOptions: IButtonOptions = {
    icon: 'email',
    hint: Enums.InterfaceTexts.sendEmailPopupButton,
    stylingMode: 'contained',
    type: 'default',
    text: Enums.InterfaceTexts.sendEmailPopupButton,
    onClick: (e: ClickEvent) => {
      console.log(e)
    },
  }

  const saveInvoicePopupButtonOptions: IButtonOptions = {
    icon: 'save',
    hint: Enums.InterfaceTexts.saveInvoiceButton,
    stylingMode: 'contained',
    type: 'default',
    text: Enums.InterfaceTexts.saveInvoiceButton,
    onClick: (e: ClickEvent) => {
      console.log(e)
    },
  }

  return (
    <div className={styles.container}>
      <Popup
        visible={popupVisible}
        onHiding={() => setPoppVisible(false)}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showCloseButton={false}
        showTitle={true}
        title={Enums.InterfaceTexts.generateInvoicePopupTitle}
        container={'.dx-viewport'}
        width={popupSize.current.width}
        height={popupSize.current.height}
      >
        <ToolbarItem
          widget={'dxButton'}
          toolbar={'bottom'}
          location={'after'}
          options={saveInvoicePopupButtonOptions}
        />
        <ToolbarItem
          widget={'dxButton'}
          toolbar={'bottom'}
          location={'after'}
          options={sendEmailPopupButtonOptions}
        />
      </Popup>
      <div className={styles.buttonsPanel}>
        <div className={styles.button}>
          <Button options={generateInvoiceButtonOptions} />
        </div>
      </div>
      <div className={styles.dateBox}>
        <DateBox options={dateBoxOptions} />
      </div>
    </div>
  )
}

export default Toolbar
