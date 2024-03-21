export const LOCAL_STORAGE_KEYS = {
  STORYTELLER: 'Storyteller.apiKey',
  AMPLITUDE: 'Storyteller.amplitudeApiKey',
};

export const getLocalStorageSetting = (key: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const valueFromStorage = localStorage.getItem(key);

  if (!valueFromStorage) {
    return '';
  }

  return JSON.parse(valueFromStorage);
};
