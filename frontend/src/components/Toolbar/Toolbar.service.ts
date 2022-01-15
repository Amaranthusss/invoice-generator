const getStylingModeBasedAtRoute = (
  routeToCompare: string
): 'contained' | 'outlined' => {
  const pathname: string = window.location.pathname

  return routeToCompare === pathname ? 'contained' : 'outlined'
}

const service = { getStylingModeBasedAtRoute }

export default service
