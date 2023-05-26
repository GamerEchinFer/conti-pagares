export const storage = {
    getObject(key: string) {
        const jsonString = localStorage.getItem(key);             
        if (jsonString) {
            return JSON.parse(jsonString)                        
        }
        return undefined          
    }   
}