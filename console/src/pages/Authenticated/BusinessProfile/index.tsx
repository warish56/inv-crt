import React, { useMemo, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  Business,
  PhotoCamera,
} from '@mui/icons-material';
import { useForm } from '@tanstack/react-form';
import { usePersonalBusinessDetails } from './hooks/usePersonalBusinessDetails';
import { useSnackbar } from '@hooks/useSnackbar';
import { useCreateOrEditBusinessProfile } from './hooks/useCreateOrEditBusinessProfile';
import { Form } from './Form';


const attributes = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'string',
    city: 'city',
    state: 'state',
    postalCode: 'postalCode',
    country: 'country',
    gstin: 'gstin',
    pan: 'pan'
  }
  
type BusinessDetails = Record<keyof typeof attributes, string>
  

export const BusinessProfilePage = () => {


    const {showSnackbar} = useSnackbar();
    const {data: business} = usePersonalBusinessDetails({userId:'1'})
    const businessData = (business?.[0]?.business);
    const [localAvatarUrl, setFiles] = useState<File| undefined>(undefined);
    const isEditMode = !!businessData?.$id;
    const mutation = useCreateOrEditBusinessProfile(isEditMode? 'edit' : 'create')


  const form = useForm<BusinessDetails>({
    defaultValues: {
      name: businessData?.name ?? '',
      email: businessData?.email ?? '',
      phone: businessData?.phone ?? '',
      address: businessData?.address ?? '',
      city: businessData?.city ?? '',
      state: businessData?.state ?? '',
      postalCode: businessData?.postal_code ?? '',
      country: 'India',
      gstin: businessData?.gstin ?? '',
      pan: businessData?.pan ?? ''
    },

    onSubmit: ({value}) => {
      mutation.mutateAsync({
        ...value,
        personal: true,
        businessId:businessData?.$id,
        userId: '1'
      }).then((res) => {
          const [_, error] = res;
          if(error){
            showSnackbar({message: error, type:'error'});
          }else{
            showSnackbar({message: `Profile updated successfully`, type:'succes'});
          }
      });
    }
  })

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files?.[0]);
    const datalist = new DataTransfer();
    e.target.files = datalist.files;
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  }


  const imageURL = useMemo(() => {
    return localAvatarUrl ? URL.createObjectURL(localAvatarUrl): '';
  }, [localAvatarUrl]) 
  
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 500 }}>
        Profile Information
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Card elevation={2} sx={{ mb: 4, overflow: 'visible' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, mb: 4 }}>
              <Box sx={{ position: 'relative', mb: { xs: 3, md: 0 }, mr: { md: 4 } }}>
                <Avatar
                  src={imageURL}
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'primary.light',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {!imageURL && <Business sx={{ fontSize: 40 }} />}
                </Avatar>
                <input
                  accept="image/*"
                  id="profile-image-input"
                  type="file"
                  hidden
                  onChange={handleFilesChange}
                />
                <label htmlFor="profile-image-input">
                  <IconButton
                    aria-label="upload profile image"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'secondary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'secondary.dark',
                      },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Business/Personal Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This information will appear on your invoices and be visible to your clients
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3} sx={{
                justifyContent: 'center'
            }}>
                <Grid item xs={12} md={6}>
                     <Form form={form}/>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={mutation.isPending}
          >
            Save Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

