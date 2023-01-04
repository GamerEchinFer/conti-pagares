export const defaultheaders = {
    headers:{
        'Authorization': 'Bearer ',   
        'Subscription-Key': process.env.NEXT_PUBLIC_SUSCRIPTION_KEY as string,
        'DeviceInfo': '',
        'UserInfo': '',
    }
  };

export let bearer:string = 'Bearer '; 