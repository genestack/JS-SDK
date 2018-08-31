/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import SystemMessage from './system-message';

type IsApplicationLoadedMessageType = 'G$is-application-loaded';
export const IS_APPLICATION_LOADED_MESSAGE_TYPE: IsApplicationLoadedMessageType
    = 'G$is-application-loaded';

export interface IsApplicationLoadedMessage extends SystemMessage {
    type: IsApplicationLoadedMessageType;
}

export interface ApplicationLoadedMessage extends SystemMessage {
    type: 'G$:application-loaded';
}
