import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../Redux-store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
