// Inspired by https://github.com/CharlesStover/use-react-router/blob/master/src/use-react-router.ts/
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

import { QueryMapContext } from './QueryMapContext';
import QueryMap from './QueryMap';

const incorrectVersionError = new Error(
  'use-react-router may only be used with react-router@^5.',
);

const missingRouterContextError = new Error(
  'useReactRouter may only be called within a <Router /> context.',
);

const incorrectUnsubscriberError = new Error(
  'Something other than UnregisterCallback is registered',
);

const missingQueryMapContextError = new Error(
  'You have to wrap the component with <QueryMapProvider />',
);

export default function useQueryMap(): UseQueryMapReturn {
  if (!__RouterContext) {
    throw incorrectVersionError;
  }

  const router: RouteComponentProps = useContext(__RouterContext);
  if (!router) {
    throw missingRouterContextError;
  }

  const queryMap = useContext(QueryMapContext);
  if (!queryMap) {
    throw missingQueryMapContextError;
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
    queryMap,
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

type UseQueryMapReturn = RouteComponentProps & { queryMap: QueryMap };
