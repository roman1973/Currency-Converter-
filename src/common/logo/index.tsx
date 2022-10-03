import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from 'app/hooks';
import { scrollToTop } from 'utils';
import { routes } from 'constants/routes';
import { ReactComponent as SiteLogo } from 'images/logo.svg';

import styles from './logo.module.scss';

const Logo: React.FC = () => {
  const logoAction = useAppSelector((state) => state.currency.logoAction);

  const navigate = useNavigate();

  const redirectHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (window.location.pathname === routes.home) {
      scrollToTop(50, 10);
    } else {
      navigate(routes.home);
    }
  };

  return (
    <div
      className={cn(styles.logo, { [styles.action]: logoAction })}
      onClick={redirectHandler}
      role="button"
      tabIndex={0}
    >
      <SiteLogo />
    </div>
  );
};

export default Logo;
