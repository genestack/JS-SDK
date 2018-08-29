/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */


/**
 * Basic interface of system message.
 * Very similar to Flux Standard Actions. Should not be used by its own.
 * Instead should be extended by actual messages that user APIs and system handlers use.
 * @property type the only required property
 * @property payload
 * @property meta
 * @property error
 */
export default interface SystemMessage {
    type: string;
    payload?: any;
    meta?: any;
    error?: boolean;
}
