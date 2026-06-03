// types
export type TestFunction = () => void;

// export type AsyncTestFunction = () => Promise<void>;

export interface OptionValue {
    name?: string;
    testFunc?: TestFunction;
    before?: string;
    after?: string;
}

export type ValueType =
    Record<string, unknown>
    | Array<Record<string, unknown>>
    | string
    | number
    | Array<string>
    | Array<number>
    | boolean
    | Array<boolean>;

export interface UnitTestResult {
    unitTestPassed: number;
    unitTestFailed: number;
    unitTestTotal: number;
}

export interface ObjectType {
    [key: string]: ValueType;
}

// delay helper function - pause task
export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
