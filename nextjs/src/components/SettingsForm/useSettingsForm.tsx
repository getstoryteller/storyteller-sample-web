import { useReducer, type ChangeEvent } from 'react';

type SettingsFormData = {
  uiStyle: string;
};

type SettingsReducerAction = {
  type: 'EDIT';
  field: keyof SettingsFormData;
  value: string;
};

function demoReducer(
  state: SettingsFormData,
  action: SettingsReducerAction,
): SettingsFormData {
  const { type: actionType, field, value } = action;

  switch (actionType) {
    case 'EDIT': {
      return {
        ...state,
        [field]: value,
      };
    }
  }
}

export function useSettingsForm(initialFormData: SettingsFormData) {
  const [formData, dispatch] = useReducer(demoReducer, initialFormData);

  const onFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch({
      type: 'EDIT',
      field: e.target.name as keyof SettingsFormData,
      value: e.target.value,
    });
  };

  return { formData, onFieldChange };
}
