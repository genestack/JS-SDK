/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

export const systemCallSymbol = Symbol.for('G$system-call');
export const systemCallSymbolSync = Symbol.for('G$system-call-sync');

export interface GenestackSystemMessage {
    type: string;
    payload?: object;
    meta?: object;
    error?: boolean;
}

export interface SystemCall {
    (message: GenestackSystemMessage): Promise<GenestackSystemMessage>;
}

export interface SystemCallSync {
    (message: GenestackSystemMessage): GenestackSystemMessage;
}
