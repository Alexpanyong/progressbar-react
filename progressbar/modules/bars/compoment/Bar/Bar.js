import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/style.module.scss';

const Bar = ({
  id,
  limit,
  initialPercent,
  stateClickedAmount,
  setStateClickedAmount,
  stateSelectedBar,
}) => {
  const [stateBarAmount, setStateBarAmount] = useState(initialPercent);
  const [stateBarText, setStateBarText] = useState(initialPercent);

  const getUpdatedPercent = () => {
    if (stateBarText > 100) {
      setStateBarAmount(100);
    } else if (stateBarText < 0) {
      setStateBarAmount(0);
    } else if (stateBarText <= 100) {
      setStateBarAmount(stateBarText);
    }
    setStateBarText(
      stateBarText > limit ? limit : stateBarText + stateClickedAmount
    );
    setStateClickedAmount(0);
  };

  useEffect(() => {
    if (stateSelectedBar === id + 1) {
      getUpdatedPercent();
    }
  }, [stateClickedAmount]);

  return (
    <Fragment>
      <div className={style.bar_wrap} id={id}>
        <div
          className={style.percentageFill}
          style={{
            width: `${stateBarAmount}%`,
            backgroundColor: `${stateBarText > 100 ? '#ff0000' : ''}`,
          }}
        />
        <div className={style.percentageText}>{`${
          stateBarText > 100 ? stateBarText : stateBarAmount
        }%`}</div>
      </div>
    </Fragment>
  );
};

Bar.defaultProps = {
  id: 0,
  limit: null,
  initialPercent: 0,
  stateClickedAmount: null,
  setStateClickedAmount: () => {},
  stateSelectedBar: 1,
};

Bar.propTypes = {
  id: PropTypes.number,
  limit: PropTypes.number,
  initialPercent: PropTypes.number,
  stateClickedAmount: PropTypes.number,
  setStateClickedAmount: PropTypes.func,
  stateSelectedBar: PropTypes.number,
};

export default Bar;
