export const LOCAL_STORAGE_KEYS = {
  STORYTELLER_API_KEY: 'Storyteller.apiKey',
  AMPLITUDE_API_KEY: 'Storyteller.amplitudeApiKey',
  UI_STYLE: 'Demo.Storyteller.uiStyle',
} as const;

type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export const getLocalStorageSetting = (key: LocalStorageKey): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const valueFromStorage = localStorage.getItem(key);

  if (!valueFromStorage) {
    return '';
  }

  return JSON.parse(valueFromStorage);
};

export const saveLocalStorageSetting = (
  key: LocalStorageKey,
  value?: string,
) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!!value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, '');
  }
};
