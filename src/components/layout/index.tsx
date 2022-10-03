import { Outlet } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';
import styles from './layout.module.scss';

const Layout: React.FC = () => (
  <div className={styles.wrapper}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
