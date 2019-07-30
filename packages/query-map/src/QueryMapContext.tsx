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

import QueryMap, {
  queryMapConstructionSecret,
} from './QueryMap';

export const QueryMapContext = React.createContext<QueryMap | undefined>(undefined);

export const QueryMappedBrowserRouter: React.FC<BrowserHistoryBuildOptions> = ({
  children,
  ...rest
}) => {
  const history = createBrowserHistory(rest);
  const queryMap = createBrowserQueryMap(history);

  return (
    <Router history={history}>
      <QueryMapContext.Provider value={queryMap}>
        {children}
      </QueryMapContext.Provider>
    </Router>
  );
};

export const QueryMappedStaticRouter: React.FC<QueryMappedStaticRouterProps> = ({
  basename,
  children,
  context,
  location,
}) => {
  const queryMap = createStaticQueryMap(location);
  return (
    <StaticRouter
      basename={basename}
      context={context}
      location={location}
    >
      <QueryMapContext.Provider value={queryMap}>
        {children}
      </QueryMapContext.Provider>
    </StaticRouter>
  );
};

function createStaticQueryMap(location: string) {
  const _location = createLocation(location);
  return new QueryMap(queryMapConstructionSecret, undefined, _location);
}

function createBrowserQueryMap(history: History) {
  return new QueryMap(queryMapConstructionSecret, history);
}

interface BrowserQueryMapProviderProps {
  history: History;
}

type QueryMappedStaticRouterProps = StaticRouterProps & {
  location: string;
};
