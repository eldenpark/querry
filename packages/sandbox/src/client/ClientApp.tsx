// import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import * as React from 'react';
import { QueryMappedBrowserRouter } from 'query-map';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <QueryMappedBrowserRouter>
      <Universal />
    </QueryMappedBrowserRouter>
  );
};

export default hot(module)(ClientApp);
