import React from 'react';
import { useQueryMap } from 'query-map';

const PageOne: React.FC<{}> = () => {
  const { history, queryMap } = useQueryMap();

  const handleClickChangeQuery = React.useCallback(() => {
    const newQuery = queryMap.mutate((obj) => ({
      a: 1,
      b: 'foo',
      c: {
        some: 'string',
      },
      ...obj,
    }))
      .toString();
    history.push(newQuery);
  }, []);

  return (
    <div>
      Page One
      <button
        onClick={handleClickChangeQuery}
        type="button"
      >
        {'{ a: 1, b: "foo", c: { some : "string" } }'}
      </button>
      <div>
        <p>
          current query string
        </p>
        <p>
          {queryMap.toString()}
        </p>
      </div>
    </div>
  );
};

export default PageOne;
