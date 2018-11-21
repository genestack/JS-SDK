/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import SystemMessage from './system-message';

export const SHOW_NOTIFICATION_MESSAGE_TYPE = 'G$:show-notification';

export enum NotificationType {
    warning = 'warning',
    success = 'success',
    error = 'error'
};

export interface Notification {
    type: NotificationType;
    message: string;
}

export interface NotificationMessage extends SystemMessage {
    type: 'G$:show-notification';
    payload: Notification;
}
