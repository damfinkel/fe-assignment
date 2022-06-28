import { useMemo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import styles from './styles.module.scss';
import EpisodeDetail from '../EpisodeDetail';

interface Props {
  episodeUrls: string[];
}

function EpisodeList({ episodeUrls }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_: any, value: number) => setSelectedTab(value);
  const episodeIds = useMemo(
    () => episodeUrls.slice(0, 5).map((url) => url.split('/episode/')?.[1]),
    [episodeUrls]
  );

  return (
    <div className={styles.container}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        className={styles.tabContainer}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {episodeIds.map((episodeId) => (
          <Tab key={episodeId} label={`Episode ${episodeId}`} />
        ))}
      </Tabs>
      <div className={styles.episodeContainer}>
        {episodeIds.map((episodeId, index) => (
          <EpisodeDetail
            key={episodeId}
            id={episodeId}
            visible={index === selectedTab}
            className={styles.episodeDetail}
          />
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
