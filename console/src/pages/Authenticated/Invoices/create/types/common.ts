
export type Step = {
    id: 'business_selection' | 'customer_selection' | 'bank_selection' | 'service_addition' | 'shipping_details' | 'additional_details'| 'preview';
    label:string;
    description: string;
    icon: React.ReactNode;
    optional: boolean;
    path: string;
  }
  