/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import SystemMessage from './system-message';

type GetBaseApplicationPropertiesMessageType = 'G$:get-base-application-properties';

type GetApplicationPropertiesMessageType = 'G$:get-application-properties';

export const GET_BASE_APPLICATION_PROPERTIES_MESSAGE_TYPE: GetBaseApplicationPropertiesMessageType
    = 'G$:get-base-application-properties';

export const GET_APPLICATION_PROPERTIES_MESSAGE_TYPE: GetApplicationPropertiesMessageType
    = 'G$:get-application-properties';

export interface GetBaseApplicationPropertiesMessage extends SystemMessage {
    type: GetBaseApplicationPropertiesMessageType;
    payload: string
}

export interface GetApplicationPropertiesMessage extends SystemMessage {
    type: GetApplicationPropertiesMessageType;
}

export interface BaseApplicationProperties {
    applicationVersion?: string;
    applicationFullId: string;
    applicationName?: string;
    applicationIconClass?: string;
    applicationIconFile?: string;
    applicationDomain?: string;
    aboutFile?: string;
    parameters?: Array<any>;
    action?: string;
    pathname: string;
}

export interface ApplicationProperties extends BaseApplicationProperties {
    applicationVersion: string;
    applicationName: string;
    applicationIconClass: string;
    applicationIconFile: string;
    applicationDomain: string;
    aboutFile: string;
    parameters: Array<any>;
    action: string;
    isApplicationHome: boolean;
}

export interface BaseApplicationPropertiesMessage extends SystemMessage {
    type: 'G$:base-application-properties';
    payload: BaseApplicationProperties;
}

export interface ApplicationPropertiesMessage extends SystemMessage {
    type: 'G$:application-properties';
    payload: ApplicationProperties
}
