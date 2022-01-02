import { locale } from 'devextreme/localization'

import Main from './components/Main/Main'

import 'devextreme/dist/css/dx.light.css'
import './index.css'

const App = (): JSX.Element => {
  locale('pl')

  return <Main />
}

export default App
