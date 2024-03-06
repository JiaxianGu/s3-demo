import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "ap-northeast-1"
const bucketName = "hone.art"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    endpoint: 's3.ap-northeast-1.wasabisys.com',
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

export async function generateDownloadURL(objectKey) {
    const Params = {
        Bucket: bucketName,
        Key: objectKey,
        Expires: 60000
    };

    const downloadURL = s3.getSignedUrl('getObject', Params);
    return downloadURL;
}