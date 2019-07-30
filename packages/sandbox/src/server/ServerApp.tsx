import { QuerriedStaticRouter } from 'querry';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  requestUrl,
}) => {
  return (
    <QuerriedStaticRouter location={requestUrl}>
      <Universal />
    </QuerriedStaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  requestUrl: string;
}
