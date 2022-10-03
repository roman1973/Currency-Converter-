import styles from './menuToggle.module.scss';

/**
 * MenuToggle component
 * */

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const MenuToggle: React.FC<Props> = ({ isOpen, onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={styles.menuToggle} onClick={onToggle} role="button" tabIndex={0}>
    {isOpen ? (
      <div className={styles.close}>
        <div className={styles.rectangle} />
        <div className={styles.rectangle} />
      </div>
    ) : (
      <div className={styles.bars}>
        <div className={styles.rectangle} />
        <div className={styles.rectangle} />
        <div className={styles.rectangle} />
      </div>
    )}
  </div>
);

export default MenuToggle;
