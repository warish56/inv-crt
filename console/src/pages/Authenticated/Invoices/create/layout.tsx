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
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import AutoSaveIndicator from './common/AutoSaveIndicator';
import { useStepsStatusTracker } from './hooks/useStepsStatusTracker';
import { useCreateOrEditInvoice } from './hooks/server/useCreateOrEditInvoice';
import { useInvoiceAtom } from './hooks/useInvoiceAtom';
import { useSnackbar } from '@hooks/useSnackbar';
import { useGetInvoiceDetails } from './hooks/server/useGetInvoiceDetails';
import { useDataInitializer } from './hooks/useDataInitializer';
import { useReactToPrint } from 'react-to-print';
import { useDownloadInvoice } from '../list/hooks/useDownloadInvoice';


type tempRefState = {
  onceInitialized: boolean; 
  prevEditMode: boolean | null;
  isDownloadFlow: boolean;
}

export const CreateInvoiceLayout = () => {
  const {allRequiredStepsCompleted} = useStepsStatusTracker()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate= useNavigate();
  const {getInvoicePayloadForServer} = useInvoiceAtom();
  const {showSnackbar} = useSnackbar();
  const tempRef = useRef<tempRefState>({onceInitialized: false, prevEditMode:null, isDownloadFlow: false})

  const reactToPrintFn = useReactToPrint({ 
    contentRef: scrollContainerRef,
    documentTitle: `Invoice-${new Date().toISOString()}`,
    print: (data) => {
      if(tempRef.current.isDownloadFlow){
        const html  = data.contentDocument?.documentElement.outerHTML;
        downloadMutation.mutateAsync({
          invoiceId: invoice?.$id || '',
          htmlContent: html || ''
        });
        tempRef.current.isDownloadFlow = false;
        return Promise.resolve({success: true})
      }else{
        return new Promise((res) => {
          data.contentWindow?.print();
          res({success:true});
        })
      }

    },
    pageStyle: `
      @page { 
        size: A4; 
        margin: 10mm; 
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
        }
      }
    `
  });
  const invoiceId = searchParams.get('inv_id');
  const isEditMode = !!invoiceId;


  const {data:invoiceResult, isPending: isLoadingInvoiceDetails} = useGetInvoiceDetails({invoiceId})
  const createOrEditmutation = useCreateOrEditInvoice(isEditMode ? 'edit': 'create');
  const downloadMutation = useDownloadInvoice();
  const {initializeData, resetData} = useDataInitializer()

  const invoice = invoiceResult?.[0]?.invoice ?? null



  useEffect(()=> {
    if(isEditMode !== tempRef.current.prevEditMode){
      tempRef.current.prevEditMode = isEditMode;
      resetData();
    }
  }, [isEditMode])



  useEffect(() => {
    if(invoice && !isLoadingInvoiceDetails){
      tempRef.current.onceInitialized = true;
      initializeData(invoice);
    }
  }, [invoice, isLoadingInvoiceDetails])


  /**
   * Handles scroll restoration
   */
  useEffect(() => {
    if(!scrollContainerRef.current){
      return
    }

    scrollContainerRef.current.scrollTo(0, -Infinity);
  }, [location.pathname])



  const handleInvoiceSave = () => {
    createOrEditmutation.mutateAsync({
        userId: '1',
        ...(isEditMode ? {invoiceId} :  {}),
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

  const handlePrint = () => {
    reactToPrintFn();
  }

  const handleDownload = () => {
    tempRef.current.isDownloadFlow = true;
    reactToPrintFn();
  }


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
          {isEditMode ? 'Edit' : 'Create New'} Invoice
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
              paddingRight: '30px',
              '@media print': {
                paddingRight: '0px',
              }
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
           showPrintBtn={allRequiredStepsCompleted && location.pathname.includes('/preview')}
           showDownloadBtn={isEditMode && allRequiredStepsCompleted && location.pathname.includes('/preview')}
           loaders={{
            isCreatingOrEditing: createOrEditmutation.isPending,
            isDownloading: downloadMutation.isPending
           }}
           handlePrint={handlePrint}
           handleDownload={handleDownload}
          />
        </Grid>

      </Grid>
    </Box>
  );
};
