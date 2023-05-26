export function validateFile(fileInput: HTMLInputElement) {
    return !fileInput || !fileInput.files || !fileInput.files.length || !fileInput.files[0].name
}