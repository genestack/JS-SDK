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
    ApplicationProperties,
    GetBaseApplicationPropertiesMessage,
    GET_BASE_APPLICATION_PROPERTIES_MESSAGE_TYPE,
    BaseApplicationPropertiesMessage
} from '@genestack/interfaces';

import {systemCall, systemCallSync} from './system-calls';


export interface ReadonlyBaseApplicationProperties {
    readonly applicationId: string;
    readonly pathname: string;
}

export interface ReadonlyApplicationProperties extends ReadonlyBaseApplicationProperties {
    readonly parameters: any[];
    readonly action: string;
    readonly applicationName: string;
    readonly applicationVersion: string;
}


export function loadApplicationProperties(applicationId: string) {
    const getBaseApplicationPropertiesMessage: GetBaseApplicationPropertiesMessage = {
        type: GET_BASE_APPLICATION_PROPERTIES_MESSAGE_TYPE,
        payload: applicationId
    };

    return systemCall(
        getBaseApplicationPropertiesMessage
    ).then<ReadonlyBaseApplicationProperties>((message) => {
        const {
            payload: {applicationFullId, pathname}
        } = message as BaseApplicationPropertiesMessage;
        return {
            get applicationId() {
                return applicationFullId
            },
            get pathname() {
                return pathname;
            }
        }
    });
}

export function loadApplication() {
    const loadedMessage: IsApplicationLoadedMessage = {
        type: IS_APPLICATION_LOADED_MESSAGE_TYPE
    };
    return systemCall(loadedMessage)
        .then<ReadonlyApplicationProperties>(() => {
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
                },
                get pathname() {
                    return appProperties.pathname;
                },
                get resourcePath() {
                    return appProperties.resourcePath;
                }
            };
        });
}
