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
import { formatDate, formatNumber } from 'devextreme/localization'

const Profits = (): JSX.Element => {
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

  const crossHairLabelFormat = (value: number | Date): string => {
    if (_.isDate(value)) return formatDate(value, 'shortDate')
    if (_.isNumber(value)) return formatNumber(value, 'currency')
    return ''
  }

  const chartOptions = useRef<IChartOptions>({
    valueAxis: {
      valueType: 'numeric',
      title: { text: 'Dochód - NETTO, zł' },
    },
    argumentAxis: {
      grid: { visible: true },
      argumentType: 'datetime',
      aggregationInterval: 'month',
    },
    commonSeriesSettings: {
      argumentField: 'fileCreationDate',
    },
    series: [
      {
        name: 'Suma zysków',
        type: 'area',
        valueField: 'netto',
        aggregation: { enabled: true, method: 'sum' },
      },
      {
        name: 'Średnia miesięczna',
        type: 'spline',
        valueField: 'netto',
        dashStyle: 'longDash',
        point: { visible: false },
        aggregation: { enabled: true, method: 'avg' },
      },
    ],
    zoomAndPan: { argumentAxis: 'both' },
    crosshair: {
      enabled: true,
      label: {
        format: crossHairLabelFormat,
        visible: true,
        backgroundColor: '#03a9f4',
      },
      horizontalLine: { color: '#03a9f4' },
      verticalLine: { color: '#03a9f4' },
    },
    dataSource: dataSource.current,
    legend: {
      verticalAlignment: 'bottom',
      horizontalAlignment: 'center',
      position: 'outside',
    },
    tooltip: { enabled: true, format: 'currency' },
    export: { enabled: true },
    onInitialized,
  })

  return <Chart options={chartOptions.current} />
}

export default Profits
