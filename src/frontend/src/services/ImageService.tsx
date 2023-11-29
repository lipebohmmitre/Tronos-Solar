import axios from "axios";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});
//44384 - Pc Sena
//44336 - Pc Felipe
//44323 - Pc Vitim

export async function UploadImage(file: File, entityType: number, entityId: number){
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/Image/${entityType}/${entityId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export async function GetImage(entityId: number, entityType: number){
  try {
    const response = await api.get(`/Image/${entityType}/${entityId}`, {
      responseType: 'arraybuffer',
    });

    const base64Image = arrayBufferToBase64(response.data);
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    
    if(base64Image)
        return imageUrl;
        
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}