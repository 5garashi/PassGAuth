// appwriteConfig.js
import { Client, Account, Databases } from "appwrite";
const isDev = import.meta.env.DEV;

// const endpoint = isDev
//   ? import.meta.env.VITE_ENDPOINT               // 例: https://cloud.appwrite.io/v1
//   : `${window.location.origin}/api`;           // nginx で /api → Appwrite にプロキシ

const endpoint=import.meta.env.VITE_ENDPOINT;  

// const endpoint = isDev
//   ? import.meta.env.VITE_ENDPOINT
//   : `${window.location.origin}${import.meta.env.BASE_URL}api`;  //  /N/api/にはしないのでコメントアウトする。
const client = new Client()
  .setEndpoint(endpoint)  // ✅ https://fra.cloud.appwrite.io/v1 など
  .setProject(import.meta.env.VITE_PROJECT_ID);


  export const account = new Account(client); // 
  export const databases = new Databases(client);
  export default client;

