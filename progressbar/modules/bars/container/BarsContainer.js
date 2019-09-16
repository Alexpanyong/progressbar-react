import React, { Fragment, useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
// import style from '../assets/style.module';
import apiEndpoint from '@shared/services/progressbar/api';
import BarsView from '../view/BarsView';

export default function Bars() {
  const [stateBarsData, setStateBarsData] = useState({});
  const [stateClickedAmount, setStateClickedAmount] = useState();
  const [stateSelectedBar, setStateSelectedBar] = useState(1);

  const onClickButton = amount => {
    setStateClickedAmount(amount);
  };

  const onSelect = e => {
    setStateSelectedBar(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(json => {
        setStateBarsData(json);
      });
  }, []);

  return (
    <Fragment>
      {!_isEmpty(stateBarsData) ? (
        <BarsView
          bars={stateBarsData.bars}
          buttons={stateBarsData.buttons}
          limit={stateBarsData.limit}
          onClickButton={onClickButton}
          stateClickedAmount={stateClickedAmount}
          setStateClickedAmount={setStateClickedAmount}
          onSelect={onSelect}
          stateSelectedBar={stateSelectedBar}
        />
      ) : null}
    </Fragment>
  );
}
