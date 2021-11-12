import Main from './components/Main/Main'

import 'devextreme/dist/css/dx.light.css'
import './index.css'
import styles from './App.module.css'

const App = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Main />
    </div>
  )
}

export default App
