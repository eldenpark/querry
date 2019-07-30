import {
  Location,
  History,
} from 'history';
import QueryString from 'query-string';

const QUERY_OBJECT = Symbol('queryObject');

export const querryConstructionSecret = Symbol('querryConstructionSecret');

const useConstructorError = new Error(
  `You have to use factory method such as 'createStaticQuerry()'`,
);

export default class Querry {
  [QUERY_OBJECT]: QueryObject = {};

  constructor(_querryConstructionSecret, history?: History, location?: Location) {
    if (_querryConstructionSecret !== querryConstructionSecret) {
      throw useConstructorError;
    }

    if (history) {
      this[QUERY_OBJECT] = parse(history.location.search);
      history.listen(this.handleChangeLocation);
    } else if (location) {
      this[QUERY_OBJECT] = parse(location.search);
    }
  }

  handleChangeLocation = (location: Location) => {
    const { search } = location;
    this[QUERY_OBJECT] = parse(search);
  };

  mutate(updater: (o: QueryObject) => QueryObject) {
    const clonedObject = { ...this[QUERY_OBJECT] };
    this[QUERY_OBJECT] = updater(clonedObject);
    return this;
  }

  toJSON() {
    return this[QUERY_OBJECT];
  }

  toString() {
    return stringify(this[QUERY_OBJECT]);
  }
}

export function parse(search): QueryObject {
  const query = {};
  const parsed = QueryString.parse(search);
  try {
    Object.entries(parsed)
      .forEach(([key, value]) => {
        if (value) {
          query[key] = JSON.parse(value as string);
        }
      });
  } catch (err) {
    console.error('Querry.parse(): error parsing query: %s', search); // eslint-disable-line no-console
  }
  return query;
}

export function stringify(queryObject = {}): string {
  let result = '';
  let count = 0;
  Object.entries(queryObject)
    .forEach(([key, value]) => {
      if (value !== undefined) {
        result += `${prefix(count)}${key}=${JSON.stringify(value)}`;
        count += 1;
      }
    });

  return result;
}

function prefix(idx) {
  return idx === 0 ? '?' : '&';
}

export interface QueryObject {
  [key: string]: object | string | number | undefined;
}
