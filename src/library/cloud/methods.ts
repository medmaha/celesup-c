import CELESUP_MEDIA_STORAGE from "./storage"

import {
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "firebase/storage"

import { AuthUser } from "../../types/user"

type BucketStrings =
    | "posts/photos/"
    | "posts/videos"
    | "posts/files"
    | "profile-avatar/"

export async function createPostImage(
    author: AuthUser,
    file: File,
): Promise<string | null> {
    const storageReference = ref(
        CELESUP_MEDIA_STORAGE,
        `posts/photos/${author.username}/__${file.name}`,
    )
    try {
        const uploaded = await uploadBytes(storageReference, file)
        const url = await getDownloadURL(uploaded.ref)
        return url
    } catch (error) {
        // console.error(error)
        return null
    }
}

export async function deletePostImage(
    bucket: BucketStrings,
): Promise<string | null> {
    const storageReference = ref(CELESUP_MEDIA_STORAGE, bucket)

    try {
        await deleteObject(storageReference)
        return "success"
    } catch (error) {
        console.error(error)
        return null
    }
}
