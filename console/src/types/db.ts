import { DiscountType, GoodsType, InvoiceStatus, SupplyType } from "./tax";

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


export type Service = {
    id: string;
    type: GoodsType;
    name: string;
    description: string;
    code: string;
    price: string;
    gst: string;
    qty: string;
}

export type ShippingDetail = {
    address: string | undefined;
    city: string | undefined;
    postalCode: string| undefined;
    state: string | undefined;
}


export type Invoice = {
    "$id": string;
    "status": InvoiceStatus;
    "invoice_name": string;
    "invoice_number": string;
    "bank_id": string| null;
    "business_id": string;
    "customer_id": string;
    "invoice_date": string;
    "invoice_due_date": string | null;
    "notes": string | null;
    "discount_type": DiscountType | null;
    "supply_type": SupplyType;
    "discount_amt": number | null;
    "services_list": Service[];
    "$createdAt": string;
    "$updatedAt": string;
    "shipping_method": string;
    "shipping_amt": number | null;
    "from_details": ShippingDetail;
    "to_details": ShippingDetail;
}

export type PartialInvoice = {
    "$id": string;
    "status": InvoiceStatus;
    "invoice_name": string;
    "invoice_number": string;
    "customer_business_name": string;
    "customer_business_email": string;
    "invoice_date": string;
    "invoice_due_date": string | null;
    "total_amt": number;
    payment_date: string | null;
}
