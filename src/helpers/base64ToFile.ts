export const base64ToFile = async (dataUrl: string, fileName: string) => {
  const res = await fetch(dataUrl) // Este es tu base64
  const blob: Blob = await res.blob()
  return new File([blob], fileName, {type: "application/pdf"})  
}