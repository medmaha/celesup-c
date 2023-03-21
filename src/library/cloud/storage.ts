import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAEHWWczvYBpXLyikkKZCJ2iQ5o3JGRgaM",
    authDomain: "media-celesup.firebaseapp.com",
    projectId: "media-celesup",
    storageBucket: "media-celesup.appspot.com",
    messagingSenderId: "129605356732",
    appId: "1:129605356732:web:8044511e75bba236f394b9",
    measurementId: "G-HS7ERLK9ZN",
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const CELESUP_MEDIA_STORAGE = getStorage(app)

export default CELESUP_MEDIA_STORAGE
