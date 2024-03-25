'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { UiStyle } from '@getstoryteller/storyteller-sdk-javascript';
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorageSetting,
  saveLocalStorageSetting,
} from '@/helpers/localStorage';

interface UiStyleContextValue {
  uiStyle: UiStyle;
  setUiStyle: (newTheme: UiStyle) => void;
}

export const UiStyleContext = createContext<UiStyleContextValue>({
  uiStyle: UiStyle.light,
  setUiStyle: () => {},
});

const UiStyleContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userTheme, setUserTheme] = useState<UiStyle.dark | UiStyle.light>(
    UiStyle.light,
  );
  const [uiStyle, _setUiStyle] = useState<UiStyle>(UiStyle.auto);

  useEffect(() => {
    const themePreferenceFromForm = getLocalStorageSetting(
      LOCAL_STORAGE_KEYS.UI_STYLE,
    );

    if (themePreferenceFromForm) {
      _setUiStyle(themePreferenceFromForm as UiStyle);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setUserTheme(mediaQuery.matches ? UiStyle.dark : UiStyle.light);

    mediaQuery.addEventListener('change', (evt) => {
      setUserTheme(evt.matches ? UiStyle.dark : UiStyle.light);
    });
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      'data-theme',
      uiStyle === 'auto' ? userTheme : uiStyle,
    );
  }, [uiStyle, userTheme]);

  const setUiStyle = useCallback((newTheme: UiStyle) => {
    _setUiStyle(newTheme);
    saveLocalStorageSetting(LOCAL_STORAGE_KEYS.UI_STYLE, newTheme);
  }, []);

  return (
    <UiStyleContext.Provider value={{ uiStyle, setUiStyle }}>
      {children}
    </UiStyleContext.Provider>
  );
};

export default UiStyleContextProvider;
