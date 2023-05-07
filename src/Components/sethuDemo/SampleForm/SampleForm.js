import React, { useCallback } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { EMPTY_OBJECT } from 'tbase/app.constants';

import Page from 'tcomponents/molecules/pageComponent/PageComponent';
import Heading from 'tcomponents/atoms/Heading';
import withActions from 'tcomponents/connectors/withActions';

import withSize from 'tcomponents/hoc/withSize';
import withEventSubmission from 'tcomponents/pages/formPage/withEventSubmission';
import DefaultFooter from 'tcomponents/pages/formPage/molecules/FooterComponent';
import { triggerSubmit } from 'tcomponents/pages/formPage/utils/formAction';
import FormBuilder from 'tcomponents/organisms/FormBuilder';

import { ACTION_HANDLERS } from './form.actionHandlers';

import { SECTIONS, FIELDS } from './formConfig';

const CONTEXT_ID = 'DEPARTMENT_DETAILS';
const FormWithSubmission = withEventSubmission(FormBuilder);

const SampleForm = props => {
  const { contentHeight, onAction, values, errors } = props;

  const handleSubmit = useCallback(() => {
    triggerSubmit(CONTEXT_ID);
  }, []);
  return (
    <Page className="full-height full-width">
      <Page.Header>
        <Heading className="full-width">{__('Basic Form')}</Heading>
      </Page.Header>
      <Page.Body>
        <FormWithSubmission
          fields={FIELDS}
          sections={SECTIONS}
          values={values}
          onAction={onAction}
          errors={errors}
          contextId={CONTEXT_ID}
        />
      </Page.Body>
      <Page.Footer>
        <DefaultFooter onSubmit={handleSubmit} />
      </Page.Footer>
    </Page>
  );
};
SampleForm.propTypes = {
  onAction: PropTypes.func.isRequired,
  contentHeight: PropTypes.number,
};
SampleForm.defaultProps = {
  contentHeight: 0,
};

export default compose(
  withSize({ hasPageFooter: 1, hasPageHeader: 1 }),
  withActions(EMPTY_OBJECT, ACTION_HANDLERS)
)(SampleForm);
