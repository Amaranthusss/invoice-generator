import { EventInfo, InitializedEventInfo } from 'devextreme/events'
import { useEffect, useRef } from 'react'
import { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { nanoid } from '@reduxjs/toolkit'
import dxDataGrid, { SelectionChangedInfo } from 'devextreme/ui/data_grid'
import DataSource from 'devextreme/data/data_source'
import _ from 'lodash'

import DataGrid from '../../_devExtreme/DataGrid/DataGrid'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setClientFirm } from '../../../Redux-store/global.reducer'
import createClient from '../../../api/client/createClient'
import updateClient from '../../../api/client/updateClient'
import deleteClient from '../../../api/client/deleteClient'
import getClients from '../../../api/client/getClients'

import { IDataGridOptions } from '../../_devExtreme/DataGrid/DataGrid.interface'
import { IClientsListClientFirmData } from './ClientsList.interface'
import { ICreateClientDto } from '../../../../../backend/src/clients/dtos/create.interface'
import { IDeleteClientDto } from '../../../../../backend/src/clients/dtos/delete.interface'
import { IUpdateClientDto } from '../../../../../backend/src/clients/dtos/update.interface'

import { clientListTableName, getColumns } from './ClientsList.options'
import { Enums } from '../../../constants/enums'

const ClientsList = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()
  const clientsListData = useRef<IClientsListClientFirmData[]>()
  const gridComponent = useRef<dxDataGrid>()

  const isMounted = useRef<boolean>(false)
  const isReadyResolve = useRef<(value: boolean) => void>()
  const isReady = useRef<Promise<boolean>>(
    new Promise((resolve) => {
      isReadyResolve.current = resolve
    })
  )

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const onInitialized = (
    e: InitializedEventInfo<dxDataGrid<any, any>>
  ): void => {
    if (_.isFunction(isReadyResolve.current)) {
      isReadyResolve.current(true)
    }
    gridComponent.current = e.component
  }

  const onSelectionChanged = (
    e: EventInfo<dxDataGrid<any, any>> & SelectionChangedInfo<any, any>
  ): void => {
    if (!_.isEmpty(e?.selectedRowKeys)) {
      dispatch(
        setClientFirm(_.last(e.selectedRowsData) as IClientsListClientFirmData)
      )
    }
  }

  const dataSource = useRef<DataSource>(
    new DataSource({
      load: async () => {
        if (_.isEmpty(clientsListData.current)) {
          const response: Promise<
            AxiosResponse<IClientsListClientFirmData[], any>
          > = getClients()
          const store: IClientsListClientFirmData[] = (await response).data

          if (isMounted.current) {
            clientsListData.current = store
          }
        }

        return clientsListData.current as IClientsListClientFirmData[]
      },

      insert: (clientData: IClientsListClientFirmData) => {
        const key: string = _.camelCase(_.toLower(nanoid(8)))
        const createdClient: ICreateClientDto = { ...clientData, key }

        return createClient(createdClient) as PromiseLike<any>
      },

      remove: (key: number) => {
        const options: IDeleteClientDto = { key: _.toString(key) }

        return deleteClient(options) as PromiseLike<any>
      },

      update: (key: number, clientData: IClientsListClientFirmData) => {
        const updatingClient: IUpdateClientDto = {
          ...clientData,
          key: _.toString(key),
        }

        return updateClient(updatingClient) as PromiseLike<any>
      },
      key: 'key',
    })
  )

  const gridOptions = useRef<IDataGridOptions>({
    name: clientListTableName,
    dataSource: dataSource.current,
    columns: getColumns(),
    selection: { mode: 'single' },
    filterRow: { visible: true },
    headerFilter: { visible: true, allowSearch: true },
    searchPanel: {
      visible: true,
      searchVisibleColumnsOnly: true,
      placeholder: Enums.InterfaceTexts.search,
    },
    toolbar: {
      items: [
        { name: 'searchPanel' },
        { name: 'addRowButton', showText: 'always' },
      ],
    },
    editing: {
      form: {
        items: [
          { dataField: 'name', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'address', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'city', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'nip', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'email', isRequired: true, editorType: 'dxTextBox' },
          {
            dataField: 'orderingData',
            isRequired: false,
            editorType: 'dxTextBox',
          },
        ],
      },
    },
    columnAutoWidth: false,
    focusedRowEnabled: true,
    onInitialized,
    onSelectionChanged,
  })

  return <DataGrid options={gridOptions.current} />
}

export default ClientsList
