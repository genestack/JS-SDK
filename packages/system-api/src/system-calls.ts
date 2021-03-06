/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

import {
    systemCallSymbol,
    systemCallSymbolSync,
    SystemCall,
    SystemCallSync
} from '@genestack/interfaces';

export const systemCall: SystemCall = (window as any)[systemCallSymbol];
export const systemCallSync: SystemCallSync = (window as any)[systemCallSymbolSync];
