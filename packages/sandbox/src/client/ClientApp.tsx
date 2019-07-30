import { hot } from 'react-hot-loader';
import * as React from 'react';
import { QuerriedBrowserRouter } from 'querry';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <QuerriedBrowserRouter>
      <Universal />
    </QuerriedBrowserRouter>
  );
};

export default hot(module)(ClientApp);
