import { useQuery } from 'react-query';
import cx from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';

import { EpisodeRequestID, getEpisode } from '../../../api/episodes';
import Attribute from '../Attribute';

import styles from './styles.module.scss';

interface Props {
  id: number | string;
  visible: boolean;
  className?: string;
}

function EpisodeDetail({ id, visible, className }: Props) {
  const { data, isLoading } = useQuery([EpisodeRequestID.DETAIL, id], () =>
    getEpisode(id)
  );
  const episode = data?.data;

  if (isLoading && visible) {
    return <CircularProgress color="primary" className={styles.loading} />;
  }

  if (!episode) {
    return <div>There was a problem. Please try again later</div>;
  }

  return (
    <div
      className={cx(styles.container, className, { [styles.visible]: visible })}
    >
      <Attribute
        title="ID"
        value={episode.id}
        titleClassName={styles.attributeTitle}
      />
      <Attribute
        title="Name"
        value={episode.name}
        titleClassName={styles.attributeTitle}
      />
      <Attribute
        title="Air Date"
        value={episode.air_date}
        titleClassName={styles.attributeTitle}
      />
      <Attribute
        title="Episode"
        value={episode.episode}
        titleClassName={styles.attributeTitle}
      />
    </div>
  );
}

export default EpisodeDetail;
