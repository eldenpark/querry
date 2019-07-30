import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '@@universal/components/Header';
import PageDefault from '@@universal/components/PageDefault';
import PageOne from '@@universal/components/PageOne';

const Universal: React.FC<{}> = () => {
  return (
    <div>
      <Header />
      <div className="page">
        <Switch>
          <Route
            component={PageOne}
            path="/pageOne"
          />
          <Route
            component={PageDefault}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Universal;
