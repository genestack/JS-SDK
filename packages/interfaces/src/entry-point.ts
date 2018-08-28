/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */


import SystemMessage from './system-message';

export const systemCallSymbol = Symbol.for('G$system-call');
export const systemCallSymbolSync = Symbol.for('G$system-call-sync');

export interface SystemCall {
    (message: SystemMessage): Promise<SystemMessage>;
}

export interface SystemCallSync {
    (message: SystemMessage): SystemMessage;
}

