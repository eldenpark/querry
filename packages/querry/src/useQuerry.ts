import {
  UnregisterCallback,
} from 'history';
import {
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {
  __RouterContext,
  RouteComponentProps,
} from 'react-router';

import QuerryContext from './QuerryContext';
import Querry from './Querry';

const incorrectVersionError = new Error(
  'use-react-router may only be used with react-router@^5.',
);

const missingRouterContextError = new Error(
  'useReactRouter may only be called within a <Router /> context.',
);

const incorrectUnsubscriberError = new Error(
  'Something other than UnregisterCallback is registered',
);

const missingQuerryContextError = new Error(
  'You have to wrap the component with <QuerryProvider />',
);

export default function useQuerry(): UseQuerryReturn {
  if (!__RouterContext) {
    throw incorrectVersionError;
  }

  const router: RouteComponentProps = useContext(__RouterContext);
  if (!router) {
    throw missingRouterContextError;
  }

  const querry = useContext(QuerryContext);
  if (!querry) {
    throw missingQuerryContextError;
  }

  const historySubscribers = useRef<UnregisterCallback[]>([]);

  const forceUpdate = useForceUpdate();
  useEffect(
    () => {
      function handleChangeHistory() {
        forceUpdate({});
      }
      const unsubscribe = router.history.listen(handleChangeHistory);
      historySubscribers.current.push(unsubscribe);

      return () => {
        if (historySubscribers.current.length > 1) {
          console.warn('unsubscribe is more than one: %s', historySubscribers.current.length); // eslint-disable-line
        }
        clearSubscribers(historySubscribers.current);
      };
    },
    [router],
  );
  return {
    ...router,
    querry,
  };
}

function clearSubscribers(arr: UnregisterCallback[]) {
  while (arr.length) {
    const unsubscribe = arr.pop();
    if (unsubscribe !== undefined) {
      unsubscribe();
    } else {
      throw incorrectUnsubscriberError;
    }
  }
}

function useForceUpdate() {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);
  return forceUpdate;
}

type UseQuerryReturn = RouteComponentProps & { querry: Querry };
