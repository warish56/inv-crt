import { useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import { StepManager } from './Steps/StepManager';
import { StepFooter } from './Footer';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import AutoSaveIndicator from './common/AutoSaveIndicator';
import { useStepsStatusTracker } from './hooks/useStepsStatusTracker';
import { useCreateOrEditInvoice } from './hooks/useCreateOrEditInvoice';
import { useInvoiceAtom } from './hooks/useInvoiceAtom';
import { useSnackbar } from '@hooks/useSnackbar';



export const CreateInvoiceLayout = () => {
  const {allRequiredStepsCompleted} = useStepsStatusTracker()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const {invoiceId} = useParams();
  const navigate= useNavigate()
  const {getInvoicePayloadForServer} = useInvoiceAtom();
  const {showSnackbar} = useSnackbar()
  const isEditMode = !!invoiceId;

  const mutation = useCreateOrEditInvoice(isEditMode ? 'edit': 'create');

  const handleInvoiceSave = () => {
      mutation.mutateAsync({
        userId: '1',
        ...getInvoicePayloadForServer()
      }).then(res => {
        const [_, error] = res;
        if(error){
          showSnackbar({message: error, type:'error'});
        }else{
          showSnackbar({message: `Invoice ${isEditMode ? 'updated' : 'created'} successfully`, type:'succes'});
          navigate('/');
        }
      })
  }


  useEffect(() => {
    if(!scrollContainerRef.current){
      return
    }

    scrollContainerRef.current.scrollTo(0, -Infinity);
  }, [location.pathname])


  return (
    <Box sx={{ 
        p: 3 ,
        "--header-hight": '200px'
    }}>
      <Stack 
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        paddingRight: '30px'
      }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Create New Invoice
        </Typography>
        <AutoSaveIndicator />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StepManager />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            ref={scrollContainerRef}
            sx={{
              height: 'calc(100dvh - var(--header-hight))',
              overflow: 'auto',
              border: 'none',
              boxShadow: 'none',
              bgcolor: 'background.default',
              paddingRight: '30px'
            }}
          >
            <CardContent sx={{
              bgcolor: 'background.default',
              boxShadow: 'none',
              padding: 0,
            }}>
              <Outlet />
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sx={{
          paddingInline: '30px'
        }}>
          <StepFooter 
           allStepsCompleted={allRequiredStepsCompleted}
           onSave={handleInvoiceSave}
           isLoading={mutation.isPending}
          />
        </Grid>

      </Grid>
    </Box>
  );
};
