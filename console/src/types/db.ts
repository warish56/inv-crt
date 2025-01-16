export type Business = {
    $id: string;
    user_id:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    city:string;
    state:string;
    postal_code:string;
    country:string;
    gstin: string;
    pan:string;
}

export type Customer = {
    $id: string;
    user_id:string;
    business_name:string;
    email:string;
    phone_number:string;
    address:string;
    city:string;
    state:string;
    postal_code:string;
    country:string;
    gstin: string;
    pan:string;
}

export type Bank = {
    $id: string;
    user_id:string;
    name:string;
    holder_name:string;
    acc_number:string;
    ifsc:string;
    type:'savings' | 'current';
}


