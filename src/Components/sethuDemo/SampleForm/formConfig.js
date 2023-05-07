import {
  FORM_KEYS,
  INPUT_FIELD,
  SINGLE_SELECT_FIELD,
  MULTI_SELECT_FIELD,
  TEXT_AREA_FIELD,
  CHK_BOX,
} from './formfields.constants';

export const SECTIONS = [
  {
    rows: [
      {
        className: 'p-t-8',
        columns: ["input", FORM_KEYS.SELECT_FIELD],
      },
      {
        columns: [FORM_KEYS.MULTI_SELECT],
      },
      {
        columns: [FORM_KEYS.CHKBOX],
      },
      {
        columns: [FORM_KEYS.TEXT_AREA],
      },
    ],
  },
];

export const FIELDS = {
  [FORM_KEYS.INPUT_FIELD]: INPUT_FIELD,
  [FORM_KEYS.SELECT_FIELD]: SINGLE_SELECT_FIELD,
  [FORM_KEYS.MULTI_SELECT]: MULTI_SELECT_FIELD,
  [FORM_KEYS.CHKBOX]: CHK_BOX,
  [FORM_KEYS.TEXT_AREA]: TEXT_AREA_FIELD, 
};
