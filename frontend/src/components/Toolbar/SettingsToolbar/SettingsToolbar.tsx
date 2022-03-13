import styles from '../Toolbar.module.css'

const SettingsToolbar = (): JSX.Element => {
  return (
    <div
      className={styles.buttonsPanel}
      style={{
        justifyContent: 'right',
      }}
    />
  )
}

export default SettingsToolbar
