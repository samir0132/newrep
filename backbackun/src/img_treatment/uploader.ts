import {BlobServiceClient, BlockBlobClient} from "@azure/storage-blob";

export class uploader {
    azureconnection ="DefaultEndpointsProtocol=https;AccountName=roady;AccountKey=Za3r1JeUeTq897gF7/EPtcua0tKr7F9U8aFsDR8txJyeUJJjFsM0bxF8sS63b5cb3Z6uVjv0oHjp+AStLrP/kg==;EndpointSuffix=core.windows.net"
    conatiner_name =  "uploaded"
    getBlobClient(imageName:string):BlockBlobClient{
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureconnection);
        const containerClient = blobClientService.getContainerClient(this.conatiner_name);
        return containerClient.getBlockBlobClient(imageName);
    }
    async upload(file:Express.Multer.File){
        const blobClient = this.getBlobClient(file.originalname);
        return new Promise((resolve, reject) => {
             blobClient.uploadData(file.buffer);
        const    data = blobClient.url
            resolve(data);
        });
    }
    async delete(filename: string){
        const blobClient = this.getBlobClient(filename);
        await blobClient.deleteIfExists();
    }
}