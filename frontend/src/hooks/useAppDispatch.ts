import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../Redux-store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
