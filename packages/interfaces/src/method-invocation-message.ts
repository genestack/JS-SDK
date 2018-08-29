/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import {JSONValue} from './json-value';
import SystemMessage from './system-message';

type MethodInvocationMessageType = 'G$:invoke-method';

export const METHOD_INVOCATION_MESSAGE_TYPE: MethodInvocationMessageType = 'G$:invoke-method';

type ApplicationId = string; // should be regex e.g. /w+\/w+/ probably,
                             // if https://github.com/Microsoft/TypeScript/issues/6579 resolved

/**
 * @property applicationId      Id of application in format "vendor/application"
 * @property method             Application method name
 * @property parameters         A list of parameters that method accepts
 * @property showBusyIndicator  If true,  a *global* busy indicator will be shown
 * @property extendSession      If true, this method call will extend current user session
 */
export interface MethodInvocationPayload {
    applicationId: ApplicationId;
    method: string;
    parameters: Array<JSONValue>
    /** @default false **/
    showBusyIndicator?: boolean;
    /** @default true **/
    extendSession?: boolean;
}

export interface MethodInvocationMessage extends SystemMessage {
    type: MethodInvocationMessageType;
    payload: MethodInvocationPayload
}

export interface ResolutionMessage extends SystemMessage {
    type: 'G$:invoke-message-success';
    payload: any;
}
export interface InvocationErrorMessage extends SystemMessage {
    type: 'G$:invoke-message-error';
    payload: any;
    error: true;
}
