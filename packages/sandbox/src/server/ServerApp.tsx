import { QueryMappedStaticRouter } from 'query-map';
// import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  requestUrl,
}) => {
  return (
    <QueryMappedStaticRouter location={requestUrl}>
      <Universal />
    </QueryMappedStaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  requestUrl: string;
}
