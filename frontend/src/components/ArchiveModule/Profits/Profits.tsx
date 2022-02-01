import { formatDate, formatNumber } from 'devextreme/localization'
import { InitializedEventInfo } from 'devextreme/events'
import { AxiosResponse } from 'axios'
import { useRef } from 'react'
import DataSource from 'devextreme/data/data_source'
import dxChart from 'devextreme/viz/chart'
import notify from 'devextreme/ui/notify'
import _ from 'lodash'

import Chart from '../../_devExtreme/Chart/Chart'

import getInvoicesTable from '../../../api/invoices/getInvoicesTable'

import { IGetTableData } from '../../../../../backend/src/invoices/dtos/getTableData.interface'
import { IChartOptions } from '../../_devExtreme/Chart/Chart.interface'

import { Enums } from '../../../constants/enums'

const Profits = (): JSX.Element => {
  const dxChart = useRef<dxChart>()
  const profitsData = useRef<IGetTableData[]>()

  const dataSource = useRef<DataSource>(
    new DataSource({
      load: async () => {
        if (_.isEmpty(profitsData.current)) {
          dxChart.current?.showLoadingIndicator()
          const response: AxiosResponse<IGetTableData[], any> =
            await getInvoicesTable()
          profitsData.current = response.data
          dxChart.current?.hideLoadingIndicator()
          if (!_.inRange(response.status, 200, 299)) {
            notify(
              Enums.InterfaceTexts.profitsChart.apiErrorNotify,
              'error',
              5000
            )
          }
        }

        return profitsData.current as IGetTableData[]
      },
      key: 'name',
    })
  )

  const onInitialized = (e: InitializedEventInfo<dxChart>): void => {
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
      title: { text: Enums.InterfaceTexts.profitsChart.valueAxisTitle },
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
        name: Enums.InterfaceTexts.profitsChart.sumSeriesName,
        type: 'area',
        valueField: 'netto',
        aggregation: { enabled: true, method: 'sum' },
      },
      {
        name: Enums.InterfaceTexts.profitsChart.avgSeriesName,
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
