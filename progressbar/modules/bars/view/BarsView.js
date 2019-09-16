import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _isEmpty from 'lodash/isEmpty';
// import { Breadcrumbs } from '@components';
import style from '../assets/style.module.scss';
import Bar from '../compoment/Bar/Bar';
import BUtton from '../compoment/Button/Button';

const BarsView = ({
  // stateBarAmount,
  bars,
  buttons,
  limit,
  onClickButton,
  onSelect,
  stateSelectedBar,
  stateClickedAmount,
  setStateClickedAmount,
}) => {
  const getSelectOptions = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < bars.length; i++) {
      const node = document.createElement('option');
      const textnode = document.createTextNode(`#progress${i + 1}`);
      const att = document.createAttribute('value');
      att.value = i + 1;
      node.setAttributeNode(att);
      node.appendChild(textnode);
      document.getElementById('barSelect').appendChild(node);
    }
  };

  useEffect(() => {
    getSelectOptions();
  }, []);

  return (
    <Fragment>
      <div className="page_container">
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            {!_isEmpty(bars) ? (
              <div>
                {bars.map(bar => (
                  <Bar
                    key={bars.indexOf(bar)}
                    id={bars.indexOf(bar)}
                    initialPercent={bar}
                    limit={limit}
                    stateSelectedBar={stateSelectedBar}
                    stateClickedAmount={stateClickedAmount}
                    setStateClickedAmount={setStateClickedAmount}
                  />
                ))}
              </div>
            ) : null}
          </Grid>
          <Grid item md={4} xs={12}>
            {!_isEmpty(bars) ? (
              <div className={style.bar_select}>
                <select id="barSelect" onChange={onSelect} />
              </div>
            ) : null}
          </Grid>
          <Grid item md={4} xs={12}>
            {!_isEmpty(buttons) ? (
              <div>
                {buttons.map(button => (
                  <BUtton
                    key={buttons.indexOf(button)}
                    id={buttons.indexOf(button)}
                    amount={button}
                    onClickButton={onClickButton}
                  />
                ))}
              </div>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

BarsView.defaultProps = {
  stateClickedAmount: null,
  setStateClickedAmount: () => {},
  bars: [],
  buttons: [],
  limit: null,
  onClickButton: () => {},
  onSelect: () => {},
  stateSelectedBar: 1,
};

BarsView.propTypes = {
  stateClickedAmount: PropTypes.number,
  setStateClickedAmount: PropTypes.func,
  bars: PropTypes.arrayOf(PropTypes.any),
  buttons: PropTypes.arrayOf(PropTypes.any),
  limit: PropTypes.number,
  onClickButton: PropTypes.func,
  onSelect: PropTypes.func,
  stateSelectedBar: PropTypes.number,
};

export default BarsView;
