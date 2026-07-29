import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
// import serviceAccount from "./spacenova-fb63f-firebase-adminsdk-fbsvc-ec56f80eca.json" with { type: "json" }
import { getAuth } from "firebase-admin/auth"
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_DATABASE)

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth()

export { db, auth }