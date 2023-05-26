import CryptoJS from 'crypto-js';

const encryptSecretKey = process.env.NEXT_PUBLIC_KEY_AES as string;
const key = CryptoJS.enc.Utf8.parse(encryptSecretKey);
const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

export const encriptar = (message: string) => {

    const encrypted = CryptoJS.AES.encrypt(message, key,
        {
            iv: iv,
        }
    );

    return encrypted.toString();

}

export const encriptarString = (message: string) => {

    const keySize = 256;
    const salt = CryptoJS.lib.WordArray.random(16);

    const key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
        keySize: keySize / 32,
        iterations: 10
    });
    
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    const result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

    return result;

}

export const desencriptar = (message: string) => {

    var valor = false ? window.atob(message) : message;
    var bytes = CryptoJS.AES.decrypt(valor, key, { iv: iv });
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted;
}