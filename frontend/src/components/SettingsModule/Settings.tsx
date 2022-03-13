import { InitializedEventInfo, NativeEventInfo } from 'devextreme/events'
import { ValueChangedInfo } from 'devextreme/ui/editor/editor'
import { useMemo, useRef } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import dxTextBox from 'devextreme/ui/text_box'
import _ from 'lodash'

import TextBoxPattern from '../_devExtreme/TextBox/TextBox'
import ButtonPattern from '../_devExtreme/Button/Button'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getFirmData, setFirmData } from '../../Redux-store/global.reducer'
import updateFirmData from '../../api/firmData/updateFirmData'
import service from '../../App.service'

import { ITextBoxOptions } from '../_devExtreme/TextBox/TextBox.interface'
import { IButtonOptions } from '../_devExtreme/Button/Button.interface'
import { IFirmDataDto } from '../../../../backend/src/firm-data/dtos/save.interface'
import { IFirmData } from '../../Redux-store/global.reducer.interface'

import { Enums } from '../../constants/enums'

import styles from './Settings.module.css'
import notify from 'devextreme/ui/notify'

const Settings = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  interface ITextBoxesComponents {
    [key: string]: dxTextBox
  }

  type IFirmDataKeys = keyof IFirmDataDto

  const textBoxesComponents = useRef<ITextBoxesComponents>({})

  const firmDataEqualityFcn = (nextFirmData: IFirmData | null): boolean => {
    if (nextFirmData != null)
      firmDataInputs.current =
        service.tranformFirmDataObjectToFrimDataDto(nextFirmData)

    _.forEach(
      textBoxesComponents.current,
      (textBoxComponent: dxTextBox, key: string) => {
        textBoxComponent.option({
          value: firmDataInputs.current[key as IFirmDataKeys] as IFirmDataKeys,
        })
      }
    )

    return false
  }

  const firmData: IFirmData | null = useAppSelector(
    getFirmData,
    firmDataEqualityFcn
  )

  const initFirmDataInputs: IFirmDataDto = useMemo(() => {
    if (firmData != null) {
      return service.tranformFirmDataObjectToFrimDataDto(firmData)
    }

    return {} as IFirmDataDto
  }, [])

  const firmDataInputs = useRef<IFirmDataDto>(initFirmDataInputs)

  const onTextBoxChange = (
    input: IFirmDataKeys,
    value: string | number
  ): void => {
    firmDataInputs.current = { ...firmDataInputs.current, [input]: value }
  }

  const onSaveClick = (): void => {
    const firmData: IFirmData = service.transformFirmDataDtoToFirmDataObject(
      firmDataInputs.current
    )

    updateFirmData(firmDataInputs.current)
      .then(() => {
        dispatch(setFirmData(firmData))
        notify(
          Enums.InterfaceTexts.settingsFirmData.saveSuccessMessage,
          'info',
          5000
        )
      })
      .catch(() => {
        notify(
          Enums.InterfaceTexts.settingsFirmData.saveErrorMessage,
          'error',
          5000
        )
      })
  }

  const firmNameTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.nameTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.nameTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.name.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['name'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('name', e.value),
  })

  const firmSubnameTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.subnameTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.subnameTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.subname.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['subname'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('subname', e.value),
  })

  const firmAddressTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.addressTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.addressTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.address.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['address'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('address', e.value),
  })

  const firmCityTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.cityTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.cityTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.city.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['city'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('city', e.value),
  })

  const firmPhoneTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.phoneTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.phoneTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.phone.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['phone'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('phone', e.value),
  })

  const firmNipTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.nipTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.nipTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.nip.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['nip'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('nip', e.value),
  })

  const firmBankAccountTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.bankAccountTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.bankAccountTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.bankAcount.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['bankAcount'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('bankAcount', e.value),
  })

  const firmBankNameTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.bankNameTextBox,
    label: Enums.InterfaceTexts.settingsFirmData.bankNameTextBox,
    labelMode: 'floating',
    defaultValue: (firmData?.bankName.value as string) ?? '',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      textBoxesComponents.current['bankName'] = e.component as dxTextBox
    },
    onValueChanged: (e: NativeEventInfo<any, Event> & ValueChangedInfo) =>
      onTextBoxChange('bankName', e.value),
  })

  const saveButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.settingsFirmData.saveButton,
    text: Enums.InterfaceTexts.settingsFirmData.saveButton,
    type: 'default',
    icon: 'save',
    onClick: onSaveClick,
  })

  return (
    <div className={styles.container}>
      <TextBoxPattern options={firmNameTextBoxOptions.current} />
      <TextBoxPattern options={firmSubnameTextBoxOptions.current} />
      <TextBoxPattern options={firmAddressTextBoxOptions.current} />
      <TextBoxPattern options={firmCityTextBoxOptions.current} />
      <TextBoxPattern options={firmPhoneTextBoxOptions.current} />
      <TextBoxPattern options={firmNipTextBoxOptions.current} />
      <TextBoxPattern options={firmBankAccountTextBoxOptions.current} />
      <TextBoxPattern options={firmBankNameTextBoxOptions.current} />

      <div className={styles.buttonsPanel}>
        <div className={styles.button}>
          <ButtonPattern options={saveButtonOptions.current} />
        </div>
      </div>
    </div>
  )
}

export default Settings
