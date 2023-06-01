const {
    FormRecognizerClient,
    AzureKeyCredential,
} = require("@azure/ai-form-recognizer");
const AzureStorageBlob = require("@azure/storage-blob");
const fs = require("fs");
const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");
 export class treatment {
     async idcard ( ) {

     }
     async  recognizeForm(file, model_id) {
         const endpoint = "https://louay.cognitiveservices.azure.com/";
         const apiKey = "e63309fddcb34eb0a0d91bbe5e402315";


         const credential = new AzureKeyCredential(apiKey);
         const client = new DocumentAnalysisClient(
             endpoint,
             credential
         );
         const poller = await client.beginAnalyzeDocument(model_id, file);

         return  await poller.pollUntilDone();
     }}