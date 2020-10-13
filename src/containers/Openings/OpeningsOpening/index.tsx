import React, {FC, memo} from 'react';
import {Link, useLocation} from 'react-router-dom';

import './OpeningsOpening.scss';

interface ComponentProps {
  description: string;
  pk: string;
  title: string;
}

const OpeningsOpening: FC<ComponentProps> = ({description, pk, title}) => {
  const location = useLocation();

  return (
    <Link className="OpeningsOpening" to={{pathname: `/openings/${pk}`, state: {from: location.pathname}}}>
      <div className="OpeningsOpening__position">{title}</div>
      <div className="OpeningsOpening__description">{description}</div>
    </Link>
  );
};

export default memo(OpeningsOpening);
