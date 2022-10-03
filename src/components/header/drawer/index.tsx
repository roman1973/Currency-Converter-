/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { NavLink, Location } from 'react-router-dom';

import { scrollToTop } from 'utils';
import { NavList } from 'types';
import { ReactComponent as DrawerClose } from 'images/drawer-close.svg';

import styles from './drawer.module.scss';

interface Props {
  isOpen: boolean;
  location: Location;
  onClose: () => void;
  navList: NavList[];
}

const Drawer: React.FC<Props> = ({ isOpen, onClose, location, navList }) => {
  const drawerScrollHandler = () => {
    onClose();
    scrollToTop(50, 10);
  };

  return (
    <nav className={cn(styles.drawer, { [styles.close]: !isOpen })}>
      <ul>
        {navList.map((item) => (
          <li key={nanoid()}>
            <NavLink
              to={location.pathname !== item.link ? item.link : ''}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
              onClick={() => drawerScrollHandler()}
            >
              {item.linkText}
            </NavLink>
          </li>
        ))}
      </ul>

      <DrawerClose className={styles.closeButton} onClick={onClose} />
    </nav>
  );
};

export default Drawer;
