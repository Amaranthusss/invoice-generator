import DateBoxWrapper from '../../devExtreme/DateBox/DateBox'

import { IDateBoxOptions } from '../../devExtreme/DateBox/DateBox.interface'

const InvoiceConfigurator = (): JSX.Element => {
  const dateBoxOptions: IDateBoxOptions = {}

  return (
    <>
      <DateBoxWrapper options={dateBoxOptions} />
    </>
  )
}

export default InvoiceConfigurator
