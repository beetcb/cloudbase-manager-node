export { guid6 } from './uuid';
export * from './cloud-api-request';
export * from './auth';
export * from './cloudbase-request';
export * from './http-request';
export * from './envLazy';
export * from './fs';
export declare function zipDir(dirPath: any, outputPath: any, ignore?: string | string[]): Promise<unknown>;
export declare function getRuntime(): string;
export declare function getEnvVar(envName: string): string;
export declare function rsaEncrypt(data: string): string;
