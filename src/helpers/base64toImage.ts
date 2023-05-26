export const base64ToImage = async (dataUrl: string, fileName: string) => {
    const res = await fetch(dataUrl)
    const blob: Blob = await res.blob()
    return new File([blob], fileName, {type: "image/bmp"})  
  }