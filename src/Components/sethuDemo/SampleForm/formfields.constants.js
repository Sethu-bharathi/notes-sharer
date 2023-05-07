import TextInputRenderer from 'tcomponents/organisms/FormBuilder/fieldRenderers/textInput';
import TextAreaRenderer from 'tcomponents/organisms/FormBuilder/fieldRenderers/textArea';
import SelectInput from 'tcomponents/organisms/FormBuilder/fieldRenderers/SelectInput';
import MultiSelect from 'tcomponents/organisms/FormBuilder/fieldRenderers/MultiSelectField';
import CheckBox from 'tcomponents/organisms/FormBuilder/fieldRenderers/checkbox';

import { isRequiredRule } from 'tbase/utils/formValidators';

export const FORM_KEYS = {
  INPUT_FIELD: 'input',
  SELECT_FIELD: 'select',
  MULTI_SELECT: 'multiSelect',
  CHKBOX: 'chkBox',
  TEXT_AREA: 'textArea',
};

export const INPUT_FIELD = {
  id: FORM_KEYS.INPUT_FIELD,
  renderer: TextInputRenderer,
  renderOptions: {
    required: true,
    label: __('Name'),
    validators: [isRequiredRule],
  },
};

export const SINGLE_SELECT_FIELD = {
  id: FORM_KEYS.SELECT_FIELD,
  renderer: SelectInput,
  renderOptions: {
    required: true,
    label: __('Employee type'),
    validators: [isRequiredRule],
    options: [
      { value: 'FULLTIME', label: 'Full time' },
      { value: 'INTERN', label: 'Intern' },
    ],
  },
};

export const MULTI_SELECT_FIELD = {
  id: FORM_KEYS.SELECT_FIELD,
  renderer: MultiSelect,
  renderOptions: {
    label: __('Select options'),
    options: [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ],
    size: 5,
  },
};

export const TEXT_AREA_FIELD = {
  id: FORM_KEYS.TEXT_AREA,
  renderer: TextAreaRenderer,
  renderOptions: {
    required: true,
    label: __('Note'),
    validators: [isRequiredRule],
  },
};

export const CHK_BOX = {
  id: FORM_KEYS.CHKBOX,
  renderer: CheckBox,
  renderOptions: {
    checkboxLabel: __('Save details'),
  },
};
