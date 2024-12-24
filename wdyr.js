import React from 'react';

const isWhyDidYouRenderEnabled = false;

if (__DEV__ && process.env.NODE_ENV !== 'test' && isWhyDidYouRenderEnabled) {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    collapseGroups: true,
    exclude: [/Pressable/, /VirtualizedList/],
  });
}
