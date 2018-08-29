/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import {
    METHOD_INVOCATION_MESSAGE_TYPE,
    MethodInvocationMessage,
    MethodInvocationPayload,
    ResolutionMessage,
    InvocationErrorMessage
} from '@genestack/interfaces';

import {systemCall} from './system-calls';

type MethodInvocationOptions = MethodInvocationPayload & {
    handler?: Function;
    errorHandler?: Function;
};

export function invokeMethod(options: MethodInvocationOptions): Promise<any> {
    const message: MethodInvocationMessage = {
        type: METHOD_INVOCATION_MESSAGE_TYPE,
        payload: {
            applicationId: options.applicationId,
            method: options.method,
            parameters: options.parameters,
            extendSession: options.extendSession,
            showBusyIndicator: options.showBusyIndicator
        }
    };
    return systemCall(message)
        .then(
            (resolutionMessage: ResolutionMessage) => {
                if (typeof options.handler === 'function') {
                    options.handler(resolutionMessage.payload);
                }
                return resolutionMessage.payload;
            },
            (errorMessage: InvocationErrorMessage | Error) => {
                const error = ('payload' in errorMessage) ? errorMessage.payload : errorMessage;
                if (typeof options.handler === 'function') {
                    options.errorHandler(error);
                }
                return error;
            }
        );
}
