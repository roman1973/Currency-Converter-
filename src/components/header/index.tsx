import cn from 'classnames';
import { nanoid } from 'nanoid';
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from 'common/logo';
import { tablet } from 'constants/dimensions';
import { navList } from 'constants/routes';
import { scrollToTop } from 'utils';

import Drawer from './drawer';
import MenuToggle from './menu-toggle';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const [isNavigationShown, setIsNavigationShown] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShadow, setIsShadow] = useState(false);

  const isTablet = useMediaQuery(tablet);
  const location = useLocation();

  const prevScrollPos = useRef(0);

  useEffect(() => {
    /* hide or show the menu */
    const scrollHandler = () => {
      const currentScrollPos = window.pageYOffset;

      setIsShadow(currentScrollPos !== 0);

      if (prevScrollPos.current > 0 || currentScrollPos > 91) {
        const visible = prevScrollPos.current > currentScrollPos || currentScrollPos <= 0;

        prevScrollPos.current = currentScrollPos;
        setIsNavigationShown(visible);
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={cn(styles.headerWrapper, {
          [styles.hidden]: !isNavigationShown,
          [styles.shadow]: isShadow && isNavigationShown,
        })}
      >
        <Logo />
        {isTablet ? (
          <MenuToggle onToggle={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />
        ) : (
          <nav className={cn(styles.navigationWrapper)}>
            <ul>
              {navList.map((item) => (
                <li key={nanoid()}>
                  <NavLink
                    to={location.pathname !== item.link ? item.link : ''}
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                    onClick={() => scrollToTop(50, 10)}
                  >
                    {item.linkText}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <Drawer location={location} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} navList={navList} />
    </>
  );
};

export default Header;
