import { InitializedEventInfo } from 'devextreme/events'
import { useRef } from 'react'
import DataSource from 'devextreme/data/data_source'
import dxChart from 'devextreme/viz/chart'
import notify from 'devextreme/ui/notify'
import _ from 'lodash'

import Chart from '../../_devExtreme/Chart/Chart'

import getInvoicesTable from '../../../api/invoices/getInvoicesTable'

import { IGetTableData } from '../../../../../backend/src/invoices/dtos/getTableData.interface'
import { IChartOptions } from '../../_devExtreme/Chart/Chart.interface'

const Profit = (): JSX.Element => {
  const dxChart = useRef<dxChart>()

  const dataSource = useRef<DataSource>(
    new DataSource({
      load: async () => {
        dxChart.current?.showLoadingIndicator()
        const response = await getInvoicesTable()
        dxChart.current?.hideLoadingIndicator()

        if (!_.inRange(response.status, 200, 299)) {
          notify('Nie udało się pobrać danych wykresu!', 'error', 5000)
        }

        const store: IGetTableData[] = response.data

        return store
      },
      key: 'name',
    })
  )

  const onInitialized = (e: InitializedEventInfo<dxChart>) => {
    dxChart.current = e.component
  }

  const chartOptions = useRef<IChartOptions>({
    dataSource: dataSource.current,
    commonSeriesSettings: { argumentField: 'name' },
    series: { type: 'spline', valueField: 'netto' },
    onInitialized,
  })

  return <Chart options={chartOptions.current} />
}

export default Profit
