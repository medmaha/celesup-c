const CS_AUTH = process.env.CS_CRYPTO_KEY

type CIpherText = string

export default class CSCryptography {
    static encrypt(plaintext: string): CIpherText {
        if (!CS_AUTH) return plaintext
        // create a new TextEncoder object to encode the plaintext
        const enc = new TextEncoder()
        const data = enc.encode(plaintext)

        // create a key from the password using the XOR operation
        let key = 0
        for (let i = 0; i < CS_AUTH.length; i++) {
            key ^= CS_AUTH.charCodeAt(i)
        }

        // use the key to encryptString the plaintext data
        let cipherText = ""
        for (let i = 0; i < data.length; i++) {
            cipherText += String.fromCharCode(data[i] ^ key)
        }
        return cipherText
    }
    static decrypt(cipherText: CIpherText): string {
        if (!CS_AUTH) return cipherText
        // create a key from the password using the XOR operation
        let key = 0
        for (let i = 0; i < CS_AUTH.length; i++) {
            key ^= CS_AUTH.charCodeAt(i)
        }

        // use the key to decryptString the cipherText data
        let plaintext = ""
        for (let i = 0; i < cipherText.length; i++) {
            plaintext += String.fromCharCode(cipherText.charCodeAt(i) ^ key)
        }
        return plaintext
    }
}
