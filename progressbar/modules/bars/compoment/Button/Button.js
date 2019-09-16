import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/style.module.scss';

const Button = ({ id, amount, onClickButton }) => {
  return (
    <Fragment>
      <div
        className={style.button_wrap}
        id={id}
        onClick={() => onClickButton(amount)}
      >
        <div className={style.percentageText}>{amount}</div>
      </div>
    </Fragment>
  );
};

Button.defaultProps = {
  id: 0,
  amount: null,
  onClickButton: () => {},
};

Button.propTypes = {
  id: PropTypes.number,
  amount: PropTypes.number,
  onClickButton: PropTypes.func,
};

export default Button;
