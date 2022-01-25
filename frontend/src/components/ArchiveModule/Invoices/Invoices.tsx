import { useRef } from 'react'
import DataSource from 'devextreme/data/data_source'
import _ from 'lodash'

import DataGrid from '../../_devExtreme/DataGrid/DataGrid'

import getInvoicesTable from '../../../api/invoices/getInvoicesTable'

import { IDataGridOptions } from '../../_devExtreme/DataGrid/DataGrid.interface'
import { IGetTableData } from '../../../../../backend/src/invoices/dtos/getTableData.interface'

import { getColumns, invoicesListTableName } from './Invoices.options'

const Invoices = (): JSX.Element => {
  const invoicesTableData = useRef<IGetTableData[]>()

  const dataSource = useRef<DataSource>(
    new DataSource({
      load: async () => {
        if (_.isEmpty(invoicesTableData.current)) {
          invoicesTableData.current = (await getInvoicesTable()).data
        }

        return invoicesTableData.current as IGetTableData[]
      },
      key: 'name',
    })
  )

  const dataGridOptions = useRef<IDataGridOptions>({
    name: invoicesListTableName,
    columns: getColumns(),
    dataSource: dataSource.current,
    scrolling: { mode: 'virtual' },
    paging: { enabled: false },
    headerFilter: { visible: true },
    filterRow: { visible: true },
    groupPanel: { visible: true },
    searchPanel: { visible: true },
  })

  return <DataGrid options={dataGridOptions.current} />
}

export default Invoices
