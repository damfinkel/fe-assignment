import cx from 'classnames';
import styles from './styles.module.scss';

interface Props {
  title: string;
  value: string | number;
  titleClassName?: string;
}

function Attribute({ title, value, titleClassName }: Props) {
  const renderedValue = value || 'Unknown';

  return (
    <div className={styles.container}>
      <h3 className={cx(styles.title, titleClassName)}>{title}</h3>
      <h4 className={styles.value}>{renderedValue}</h4>
    </div>
  );
}

export default Attribute;
