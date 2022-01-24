import DataSource from 'devextreme/data/data_source'
import { useRef } from 'react'

import Chart from '../../_devExtreme/Chart/Chart'

import getInvoicesTable from '../../../api/invoices/getInvoicesTable'

import { IGetTableData } from '../../../../../backend/src/invoices/dtos/getTableData.interface'
import { IChartOptions } from '../../_devExtreme/Chart/Chart.interface'

const Profit = (): JSX.Element => {
  const dataSource = useRef<DataSource>(
    new DataSource({
      load: async () => {
        const store: IGetTableData[] = (await getInvoicesTable()).data

        return store
      },
      key: 'name',
    })
  )

  const chartOptions = useRef<IChartOptions>({
    dataSource: dataSource.current,
    commonSeriesSettings: { argumentField: 'name' },
    series: { type: 'spline', valueField: 'netto' },
  })

  return <Chart options={chartOptions.current} />
}

export default Profit
