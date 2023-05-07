import FORM_ACTION_TYPES from 'tcomponents/organisms/FormBuilder/constants/actionTypes';
import { FORM_KEYS } from './formfields.constants';

// const FIELD_ID_VS_ON_CHNAGE = {
//   [FORM_KEYS.INPUT_FIELD]: onChangeHanlder,
// };

const handleOnfieldChange = ({ params, getState, setState }) => {
  const { id, value } = params;
  const { values } = getState();
  setState({ values: { ...values, [id]: value } });
  console.log(getState())
};

const handleFormErrors = ({ params, setState }) => {
  const { errors } = params;
  setState({ errors });
};
const handleSubmit = ({ params }) => {
  console.log('params:', params);
};

const ACTION_TYPES = {
  ON_FORM_SUBMIT: 'ON_FORM_SUBMIT',
};
  
export const ACTION_HANDLERS = {
  [FORM_ACTION_TYPES.ON_FIELD_CHANGE]: handleOnfieldChange,
  [FORM_ACTION_TYPES.VALIDATION_SUCCESS]: handleFormErrors,
  [ACTION_TYPES.ON_FORM_SUBMIT]: handleSubmit,
};
