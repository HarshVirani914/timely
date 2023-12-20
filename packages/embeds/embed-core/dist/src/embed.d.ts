import type { InterfaceWithParent, interfaceWithParent, UiConfig, EmbedThemeConfig } from "./embed-iframe";
import type { EventData, EventDataMap } from "./sdk-action-manager";
import { SdkActionManager } from "./sdk-action-manager";
type Rest<T extends any[]> = T extends [any, ...infer U] ? U : never;
export type Message = {
    originator: string;
    method: keyof InterfaceWithParent;
    arg: InterfaceWithParent[keyof InterfaceWithParent];
};
declare module "*.css";
type Namespace = string;
type Config = {
    calOrigin: string;
    debug?: boolean;
    uiDebug?: boolean;
};
type InitArgConfig = Partial<Config> & {
    origin?: string;
};
type DoInIframeArg = {
    [K in keyof typeof interfaceWithParent]: {
        method: K;
        arg?: Parameters<(typeof interfaceWithParent)[K]>[0];
    };
}[keyof typeof interfaceWithParent];
type SingleInstructionMap = {
    [K in keyof CalApi]: CalApi[K] extends (...args: never[]) => void ? [K, ...Parameters<CalApi[K]>] : never;
};
type SingleInstruction = SingleInstructionMap[keyof SingleInstructionMap];
export type Instruction = SingleInstruction | SingleInstruction[];
export type InstructionQueue = Instruction[];
export type PrefillAndIframeAttrsConfig = Record<string, string | string[] | Record<string, string>> & {
    iframeAttrs?: Record<string, string> & {
        id?: string;
    };
    theme?: EmbedThemeConfig;
};
export declare class Cal {
    iframe?: HTMLIFrameElement;
    __config: Config;
    modalBox: Element;
    inlineEl: Element;
    namespace: string;
    actionManager: SdkActionManager;
    iframeReady: boolean;
    iframeDoQueue: DoInIframeArg[];
    api: CalApi;
    static actionsManagers: Record<Namespace, SdkActionManager>;
    static getQueryObject(config: PrefillAndIframeAttrsConfig): Record<string, string | Record<string, string> | string[]> & {
        iframeAttrs?: (Record<string, string> & {
            id?: string | undefined;
        }) | undefined;
        theme?: EmbedThemeConfig | undefined;
    } & {
        guest?: string | string[] | undefined;
    };
    processInstruction(instructionAsArgs: IArguments | Instruction): SingleInstruction[] | undefined;
    processQueue(queue: IArguments[]): void;
    createIframe({ calLink, queryObject, calOrigin, }: {
        calLink: string;
        queryObject?: PrefillAndIframeAttrsConfig & {
            guest?: string | string[];
        };
        calOrigin?: string;
    }): HTMLIFrameElement;
    getConfig(): Config;
    doInIframe(doInIframeArg: DoInIframeArg): void;
    constructor(namespace: string, q: IArguments[]);
}
declare class CalApi {
    cal: Cal;
    constructor(cal: Cal);
    init(namespaceOrConfig?: string | InitArgConfig, config?: InitArgConfig): void;
    /**
     * It is an instruction that adds embed iframe inline as last child of the element
     */
    inline({ calLink, elementOrSelector, config, }: {
        calLink: string;
        elementOrSelector: string | HTMLElement;
        config?: PrefillAndIframeAttrsConfig;
    }): void;
    floatingButton({ calLink, buttonText, hideButtonIcon, attributes, buttonPosition, buttonColor, buttonTextColor, calOrigin, config, }: {
        calLink: string;
        buttonText?: string;
        attributes?: Record<"id", string> & Record<string | "id", string>;
        hideButtonIcon?: boolean;
        buttonPosition?: "bottom-left" | "bottom-right";
        buttonColor?: string;
        buttonTextColor?: string;
        calOrigin?: string;
        config?: PrefillAndIframeAttrsConfig;
    }): void;
    modal({ calLink, calOrigin, config, uid, }: {
        calLink: string;
        config?: PrefillAndIframeAttrsConfig;
        uid?: string | number;
        calOrigin?: string;
    }): void;
    on<T extends keyof EventDataMap>({ action, callback, }: {
        action: T;
        callback: (arg0: CustomEvent<EventData<T>>) => void;
    }): void;
    off<T extends keyof EventDataMap>({ action, callback, }: {
        action: T;
        callback: (arg0: CustomEvent<EventData<T>>) => void;
    }): void;
    preload({ calLink }: {
        calLink: string;
    }): void;
    ui(uiConfig: UiConfig): void;
}
export interface GlobalCalWithoutNs {
    <T extends keyof SingleInstructionMap>(methodName: T, ...arg: Rest<SingleInstructionMap[T]>): void;
    /** Marks that the embed.js is loaded. Avoids re-downloading it. */
    loaded?: boolean;
    /** Maintains a queue till the time embed.js isn't loaded */
    q: IArguments[];
    /** If user registers multiple namespaces, those are available here */
    instance?: Cal;
    __css?: string;
    fingerprint?: string;
    __logQueue?: unknown[];
}
type GlobalCalWithNs = GlobalCalWithoutNs & {
    ns: Record<string, GlobalCalWithoutNs>;
};
export type GlobalCal = GlobalCalWithNs;
declare global {
    interface Window {
        Cal: GlobalCal;
    }
}
export interface CalWindow extends Window {
    Cal: GlobalCal;
}
export {};
//# sourceMappingURL=embed.d.ts.map