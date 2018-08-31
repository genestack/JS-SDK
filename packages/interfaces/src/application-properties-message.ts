/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 *
 */

import SystemMessage from './system-message';

type GetApplicationPropertiesMessageType = 'G$:get-application-properties';
export const GET_APPLICATION_PROPERTIES_MESSAGE_TYPE: GetApplicationPropertiesMessageType
    = 'G$:get-application-properties';

export interface GetApplicationPropertiesMessage extends SystemMessage {
    type: GetApplicationPropertiesMessageType;
}

export interface ApplicationProperties {
    applicationVersion: string;
    applicationFullId: string;
    applicationName: string;
    applicationIconClass: string;
    applicationIconFile: string;
    applicationDomain: string;
    aboutFile: string;
    parameters: Array<any>;
    action: string;
    isApplicationHome: boolean;
}

export interface ApplicationPropertiesMessage extends SystemMessage {
    type: 'G$:application-properties';
    payload: ApplicationProperties
}
