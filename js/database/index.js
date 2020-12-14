import * as admin from "firebase-admin"

const serviceAccount = {
	"type": "service_account",
	"project_id": "convex-cd1c6",
	"private_key_id": process.env.private_key_id,
	"private_key": process.env.private_key,
	"client_email": "firebase-adminsdk-hod8c@convex-cd1c6.iam.gserviceaccount.com",
	"client_id": "111485684463748454418",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hod8c%40convex-cd1c6.iam.gserviceaccount.com"
}

const config = {
    credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://convex-cd1c6.firebaseio.com"
}

export default admin.apps.length ? admin.app() : admin.initializeApp(config)

const firestore = admin.firestore()

const users = firestore.collection("users")
const releases = firestore.collection("releases")

export {
    admin,
    users,
    releases
}