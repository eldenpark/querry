import React from 'react';
import { useQueryMap } from 'query-map';

const Title = ({
  pathname,
}) => {
  return (
    <div>{pathname}</div>
  );
};

const Header: React.FC<{}> = () => {
  const { history, location } = useQueryMap();
  const { pathname } = location;

  const handleClickButton = React.useCallback((route) => () => {
    history.push(route);
  }, []);

  return (
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <Title pathname={pathname} />
      <button
        onClick={handleClickButton('/')}
        type="button"
      >
        Root
      </button>
      <button
        onClick={handleClickButton('/pageOne')}
        type="button"
      >
        Page one
      </button>
    </div>
  );
};

export default Header;
