import React from "react";
import PropTypes from "prop-types";
import { Message, Transition } from "semantic-ui-react";

const ErrorMessage = ({ errors, header }) => {
  return (
    <>
      {errors.length > 0 && (
        <Message negative name="errorMsg">
          {errors.length === 1 ? (
            <SingleError header={errors[0]} />
          ) : (
            <ErrorList errors={errors} header={header} />
          )}
        </Message>
      )}
    </>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string
};

const SingleError = ({ header }) => {
  return (
    <Transition transitionOnMount={true} animation="shake" duration={800}>
      <Message.Header>{header}</Message.Header>
    </Transition>
  );
};

SingleError.propTypes = {
  header: PropTypes.string
};

const ErrorList = ({ errors, header }) => {
  return (
    <Transition transitionOnMount={true} animation="shake" duration={800}>
      <div>
        <Message.Header>{header}</Message.Header>
        <Message.List>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      </div>
    </Transition>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string
};

export default ErrorMessage;
