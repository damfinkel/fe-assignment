import styles from './styles.module.scss';

interface Props {
  title: string;
  value: string | number;
}

function Attribute({ title, value }: Props) {
  const renderedValue = value || 'Unknown';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.value}>{renderedValue}</h4>
    </div>
  );
}

export default Attribute;
