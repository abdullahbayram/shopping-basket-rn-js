import React from 'react';

if (__DEV__ && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });

  console.log('whyDidYouRender enabled');
}
