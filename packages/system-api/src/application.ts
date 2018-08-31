/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import {
    IS_APPLICATION_LOADED_MESSAGE_TYPE,
    IsApplicationLoadedMessage,
    GetApplicationPropertiesMessage,
    GET_APPLICATION_PROPERTIES_MESSAGE_TYPE,
    ApplicationProperties
} from '@genestack/interfaces';

import {systemCall, systemCallSync} from './system-calls';

export function loadApplication() {
    const loadedMessage: IsApplicationLoadedMessage = {
        type: IS_APPLICATION_LOADED_MESSAGE_TYPE
    };
    return systemCall(loadedMessage)
        .then(() => {
            const getApplicationPropertiesMessage: GetApplicationPropertiesMessage = {
                type: GET_APPLICATION_PROPERTIES_MESSAGE_TYPE
            };
            const appProperties: ApplicationProperties = systemCallSync(
                getApplicationPropertiesMessage
            ).payload;
            return {
                get applicationId() {
                    return appProperties.applicationFullId;
                },
                get parameters() {
                    return appProperties.parameters;
                },
                get action() {
                    return appProperties.action;
                },
                get applicationVersion() {
                    return appProperties.applicationVersion;
                },
                get applicationName() {
                    return appProperties.applicationName;
                }
            };
        });
}
