import CELESUP_MEDIA_STORAGE from "./storage"

import {
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "firebase/storage"

import { AuthUser } from "../../types/user"
import { createFileFromDataUrl } from "../../apps/media/post/utils"

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

export async function updateUserProfile(
    user: AuthUser,
    path: "avatar" | "cover_img",
    file: File,
) {
    const storageReference = ref(
        CELESUP_MEDIA_STORAGE,
        `profiles/${user.username.trim()}/${path.trim()}/__${
            file.name
        }-${Date.now().toString()}`,
    )

    const prev = { ...user } as any
    const media = prev as { avatar: string; cover_img: string }

    if (media[path].match(/http/g))
        try {
            await deleteObject(ref(CELESUP_MEDIA_STORAGE, media[path]))
            console.log("deleted existing files")
        } catch (error: any) {
            console.error(error.message)
        }

    try {
        const uploaded = await uploadBytes(storageReference, file)
        const url = await getDownloadURL(uploaded.ref)
        return Promise.resolve(url)
    } catch (error) {
        return Promise.resolve(media[path])
    }
}
