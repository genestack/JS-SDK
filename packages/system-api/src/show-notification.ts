
/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import {systemCall} from './system-calls';
import {
    NotificationType,
    NotificationMessage,
    SHOW_NOTIFICATION_MESSAGE_TYPE
} from '@genestack/interfaces';

export async function showNotification(
    message: string,
    type: NotificationType = NotificationType.warning
) {
    const systemCallMessage: NotificationMessage = {
        type: SHOW_NOTIFICATION_MESSAGE_TYPE,
        payload: {
            message,
            type
        }
    };

    await systemCall(systemCallMessage)
}
