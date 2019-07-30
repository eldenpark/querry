import React from 'react';
import { useQuerry } from 'querry';

const PageOne: React.FC<{}> = () => {
  const { history, querry } = useQuerry();

  const handleClickChangeQuery = React.useCallback(() => {
    const newQuery = querry.mutate((obj) => ({
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
          {querry.toString()}
        </p>
      </div>
    </div>
  );
};

export default PageOne;
