/**
 * Copyright 2022 Beijing Volcanoengine Technology Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

export enum ERRORTYPE {
  /**
   * @brief Client business logic issues
   */
  CLIENT,
  /**
   * @brief Publish/Subscribe/Stop Publish or Subscribe http request error
   */
  HTTP,
  /**
   * @brief Offer exchange successful, setup failed
   */
  MEDIA,
  /**
   * @brief After establishing the connection, the p2p connection status is disconnected
   */
  PEER,
  SUCCESS,
}

export enum PEEREVENT {
  Disconnect = 'Disconnect',
}
