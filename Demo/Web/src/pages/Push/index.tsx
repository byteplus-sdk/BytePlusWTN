/**
 * Copyright 2022 Beijing Volcanoengine Technology Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Modal } from 'antd';
import rtcClient from '@/lib/RtcClient';
import { DEFAULT_CONFIG, URL_CONFIGS } from '@/config';
import { ERRORTYPE, PEEREVENT } from '@/lib/interface';

import Header from './Header';
import StreamButtons from './StreamButtons';
import styles from './index.module.less';
import { genSubscribePlayerSite } from '@/utils';

function Push() {
  const { t } = useTranslation();
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [pushAndPullUrl, setPushAndPullUrl] = useState({
    pushUrl: '',
    pullUrl: '',
  });
  const player = useRef<HTMLVideoElement>(null);

  const handlePublish = async (published: boolean) => {
    if (publishing) {
      return;
    }
    setPublishing(true);

    if (published) {
      const res = await rtcClient.publish(pushAndPullUrl.pushUrl);

      if (res.code === ERRORTYPE.SUCCESS) {
        setPublished(published);
        message.success({
          className: styles.message,
          content: <span className="title">{t('pushSuccMsg')}</span>,
        });
      } else if (res.status === 401 || res.status === 403) {
        message.error(t('pushTokenExpired'));
      } else {
        message.error(t('pushHttpError'));
      }
    } else {
      const res = (await rtcClient.unPublish()) as {
        code: number;
        status: number;
      };

      if (res.code === ERRORTYPE.SUCCESS) {
        setPublished(published);
      } else {
        message.error(t('stopPushError'));
        console.error(t('stopPushError'), res);
      }
    }

    setPublishing(false);
  };

  useEffect(() => {
    const pullInfo = genSubscribePlayerSite(URL_CONFIGS.SUBSCRIBE_URL);
    // Your Push URL and Pull URL
    setPushAndPullUrl({
      pushUrl: URL_CONFIGS.PUBLISH_URL,
      pullUrl: `${window.location.host}/view?appid=${pullInfo.appid}&streamid=${pullInfo.streamid}&domain=${pullInfo.domain}`,
    });
  }, []);

  useEffect(() => {
    const handelDisconnect = (err: ERRORTYPE) => {
      setPublished(false);
      if (err === ERRORTYPE.MEDIA) {
        message.error(t('pushMediaError'));
        console.error(t('pushMediaError'));
      } else if (err === ERRORTYPE.PEER) {
        Modal.confirm({
          content: t('pushP2pError'),
          okText: t('retry'),
          cancelText: t('关闭'),
          onOk: () => {
            rtcClient.beforeRePublish();
            handlePublish(true);
          },
          onCancel: () => {
            rtcClient.beforeRePublish();
          },
        });
      }
    };

    rtcClient.on(PEEREVENT.Disconnect, handelDisconnect);

    return () => {
      rtcClient.removeListener(PEEREVENT.Disconnect, handelDisconnect);
    };
  }, [setPublished]);

  useEffect(() => {
    const play = async () => {
      await rtcClient.getMediaDevices();
      // 1. Set video parameters
      await rtcClient.setVideoCaptureConfig({
        ...DEFAULT_CONFIG.resolution,
        frameRate: DEFAULT_CONFIG.frameRate,
      });
      // 2. Creating a local stream
      await rtcClient.startAudioCapture();
      await rtcClient.startVideoCapture();
      // 3. Play local stream
      rtcClient.setLocalVideoPlayer('local-stream');
    };
    play();
  }, []);

  return (
    <div className={styles.container}>
      <video id="local-stream" muted ref={player} className={styles['stream-player']} />
      <Header />
      <StreamButtons
        shareUrl={pushAndPullUrl.pullUrl}
        onPublish={handlePublish}
        published={published}
      />
    </div>
  );
}

export default Push;
