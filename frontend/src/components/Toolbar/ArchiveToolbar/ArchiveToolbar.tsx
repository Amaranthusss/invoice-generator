import styles from '../Toolbar.module.css'

const ArchiveToolbar = (): JSX.Element => {
  return (
    <div
      className={styles.buttonsPanel}
      style={{
        justifyContent: 'right',
      }}
    />
  )
}

export default ArchiveToolbar
