/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import SystemMessage from './system-message';

type HandleErrorMessageType = 'G$:handle-error';
export const HANDLE_ERROR_MESSAGE_TYPE: HandleErrorMessageType = 'G$:handle-error';

interface GenestackServerError {
    name: string;
    message: string;
    stack: string;
    serverStackTrace: string;
    responseText: string;
    calledApplicationId: string;
    method: string;
    parameters: Array<any>;
    notificationError: string;
    supportEmail: string;
}

export interface HandleErrorMessage extends SystemMessage {
    type: HandleErrorMessageType;
    payload: Error | GenestackServerError
}
