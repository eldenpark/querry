import {
  createBrowserHistory,
  createLocation,
  BrowserHistoryBuildOptions,
  History,
} from 'history';
import React from 'react';
import {
  StaticRouterProps,
} from 'react-router';
import {
  Router,
  StaticRouter,
} from 'react-router-dom';

import Querry, {
  querryConstructionSecret,
} from './Querry';
import QuerryContext from './QuerryContext';

export const QuerriedBrowserRouter: React.FC<BrowserHistoryBuildOptions> = ({
  children,
  ...rest
}) => {
  const history = createBrowserHistory(rest);
  const querry = createBrowserQuerry(history);

  return (
    <Router history={history}>
      <QuerryContext.Provider value={querry}>
        {children}
      </QuerryContext.Provider>
    </Router>
  );
};

export const QuerriedStaticRouter: React.FC<QuerriedStaticRouterProps> = ({
  basename,
  children,
  context,
  location,
}) => {
  const querry = createStaticQuerry(location);
  return (
    <StaticRouter
      basename={basename}
      context={context}
      location={location}
    >
      <QuerryContext.Provider value={querry}>
        {children}
      </QuerryContext.Provider>
    </StaticRouter>
  );
};

function createStaticQuerry(location: string) {
  const _location = createLocation(location);
  return new Querry(querryConstructionSecret, undefined, _location);
}

function createBrowserQuerry(history: History) {
  return new Querry(querryConstructionSecret, history);
}

type QuerriedStaticRouterProps = StaticRouterProps & {
  location: string;
};
