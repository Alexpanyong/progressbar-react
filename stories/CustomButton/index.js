import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { Button } from '@components';
import theme from '../../shared/assets/overrides/material-ui/theme';

storiesOf('Custom Button', module)
  .addDecorator(muiTheme([theme]))
  .add('Primary Filled', () => {
    const doClick = () => {};

    return <Button doClick={doClick}>Click Me!</Button>;
  })
  .add('Secondary Filled', () => {
    const doClick = () => {};

    return (
      <Button doClick={doClick} type="secondary">
        Click Me!
      </Button>
    );
  })
  .add('Disabled Filled', () => {
    const doClick = () => {};

    return (
      <Button doClick={doClick} disabled>
        Click Me!
      </Button>
    );
  })
  .add('Primary Outlined', () => {
    const doClick = () => {};

    return (
      <Button variant="outlined" doClick={doClick}>
        Click Me!
      </Button>
    );
  })
  .add('Secondary Outlined', () => {
    const doClick = () => {};

    return (
      <Button variant="outlined" type="secondary" doClick={doClick}>
        Click Me!
      </Button>
    );
  })
  .add('Disabled Outlined', () => {
    const doClick = () => {};

    return (
      <Button variant="outlined" doClick={doClick} disabled>
        Click Me!
      </Button>
    );
  })
  .add('Primary Text', () => {
    const doClick = () => {};

    return (
      <Button variant="text" doClick={doClick}>
        Click Me!
      </Button>
    );
  })
  .add('Secondary Text', () => {
    const doClick = () => {};

    return (
      <Button variant="text" type="secondary" doClick={doClick}>
        Click Me!
      </Button>
    );
  })
  .add('Disabled Text', () => {
    const doClick = () => {};

    return (
      <Button variant="text" doClick={doClick} disabled>
        Click Me!
      </Button>
    );
  });
