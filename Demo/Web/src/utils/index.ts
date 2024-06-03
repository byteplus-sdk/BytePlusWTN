/**
 * Copyright 2022 Beijing Volcanoengine Technology Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

export { default as Logger } from './Logger';

/**
 * @brief Generate subscribe visit site.
 * @param url The subscribed url.
 */
export const genSubscribePlayerSite = (url: string) => {
    const fragments = url.replace('http://', '').replace('https://', '').split('/');
    return {
        appid: fragments?.at(-2),
        streamid: fragments?.at(-1),
        domain: fragments?.at(0),
    }
}