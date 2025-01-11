import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { SupplyType } from '@types/tax';




type interStateProps = {
    gstRate: string;
    igst: number;
}
const InterStateGst = ({gstRate, igst}:interStateProps) => {
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              IGST ({gstRate}%)
            </Typography>
            <Typography variant="body1">₹ {igst}</Typography>
          </Grid>
    )
}


type intraStateProps = {
    gstRate: string;
    cgst: number;
    sgst: number;
}

const IntraStateGst = ({gstRate, cgst, sgst}:intraStateProps) => {
    return (
        <>
        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            CGST ({(parseFloat(gstRate) / 2)}%)
          </Typography>
          <Typography variant="body1">₹ {cgst}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            SGST ({(parseFloat(gstRate) / 2)}%)
          </Typography>
          <Typography variant="body1">₹ {sgst}</Typography>
        </Grid>
      </>
    )
}


type UnionTerritoryProps = {
    gstRate: string;
    cgst: number;
    utgst: number;
}

const UnionTerritoryGst = ({
    gstRate,
    cgst,
    utgst
}:UnionTerritoryProps) => {
    return (
        <>
        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            CGST ({(parseFloat(gstRate) / 2)}%)
          </Typography>
          <Typography variant="body1">₹ {cgst}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            UTGST ({(parseFloat(gstRate) / 2)}%)
          </Typography>
          <Typography variant="body1">₹ {utgst}</Typography>
        </Grid>
      </>
    )
}




type props = {
    gstRate: string;
    cgst: number;
    sgst: number;
    igst: number;
    utgst: number;
    totalAmount: number;
    totalTax: number;
    supplyType: SupplyType
}

export const TaxBreakDown = ({
    gstRate,
    sgst,
    cgst,
    utgst,
    igst,
    totalAmount,
    totalTax,
    supplyType
}:props) => {
    return (
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tax Breakdown
      </Typography>
      <Grid container spacing={2}>
        {supplyType === 'intraState' && (
            <IntraStateGst gstRate={gstRate} cgst={cgst} sgst={sgst} />
        )}
        
        {supplyType === 'interState' && (
            <InterStateGst gstRate={gstRate} igst={igst}  />
        )}

        {supplyType === 'unionTerritory' && (
            <UnionTerritoryGst gstRate={gstRate} cgst={cgst} utgst={utgst}/>
        )}

        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Total Tax
          </Typography>
          <Typography variant="body1">₹ {totalTax}</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Total Amount
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ₹ {totalAmount}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    )
}