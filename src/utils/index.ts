import fs from 'fs'
import archiver from 'archiver'
import crypto from 'crypto'
import { PUBLIC_RSA_KEY, ENV_NAME } from '../constant'

export { guid6 } from './uuid'
export * from './cloud-api-request'
export * from './auth'
export * from './cloudbase-request'
export * from './http-request'
export * from './envLazy'
export * from './fs'

export async function zipDir(dirPath, outputPath, ignore?: string | string[]) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath)
        const archive = archiver('zip')

        output.on('close', function() {
            resolve({
                zipPath: outputPath,
                size: Math.ceil(archive.pointer() / 1024)
            })
        })

        archive.on('error', function(err) {
            reject(err)
        })

        archive.pipe(output)
        // append files from a glob pattern
        archive.glob('**/*', {
            // 目标路径
            cwd: dirPath,
            ignore: ignore,
            dot: true
        })
        archive.finalize()
    })
}

export function getRuntime(): string {
    return process.env[ENV_NAME.ENV_RUNENV]
}

export function getEnvVar(envName: string): string {
    return process.env[envName]
}

export function rsaEncrypt(data: string): string {
    const buffer = Buffer.from(data)
    const encrypted = crypto.publicEncrypt(
        {
            key: PUBLIC_RSA_KEY,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
    )
    return encrypted.toString('base64')
}
