import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MasterLayout = ({ children }) => {
  return (
    <div className="page_bg">
      <Fragment>{children}</Fragment>
    </div>
  );
};

MasterLayout.defaultProps = {
  children: <div />,
};

MasterLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf([PropTypes.element, PropTypes.string]),
  ]),
};

export default MasterLayout;
