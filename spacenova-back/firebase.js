import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./spacenova-fb63f-firebase-adminsdk-fbsvc-ec56f80eca.json" with { type: "json" }
import { getAuth } from "firebase-admin/auth"

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth()

export { db, auth }