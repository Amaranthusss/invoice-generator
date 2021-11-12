import _ from 'lodash'

import Grid from '../common/grid/Grid'

import { gridOptions } from './Main.options'
import { firmData, IFirmDataParameter } from '../../data/firmData'

import styles from './Main.module.css'

const Main = (): JSX.Element => {
  return (
    <div className={styles.container}>
      {_.map(
        firmData,
        (data: IFirmDataParameter, index: string): JSX.Element => {
          return (
            <div key={index}>
              {data.caption != null ? data.caption : ''}
              {data.value}
            </div>
          )
        }
      )}

      <Grid options={gridOptions} />
    </div>
  )
}

export default Main
