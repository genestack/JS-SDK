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
