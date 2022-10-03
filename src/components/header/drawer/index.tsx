/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

import { scrollToTop } from 'utils';
import { NavList } from 'types';
import { ReactComponent as DrawerClose } from 'images/drawer-close.svg';

import styles from './drawer.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navList: NavList[];
}

const Drawer: React.FC<Props> = ({ isOpen, onClose, navList }) => {
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
              to={item.link}
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
