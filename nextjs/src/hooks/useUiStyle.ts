import { useContext } from 'react';
import { UiStyleContext } from '@/contexts/UiStyleContext';

export const useUiStyle = () => useContext(UiStyleContext);
