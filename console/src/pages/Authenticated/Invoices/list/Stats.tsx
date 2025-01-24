import React from 'react';

import { 
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { 
    AttachMoney,
    AccountBalanceWallet,
    TrendingUp,
    TrendingDown
  } from '@mui/icons-material';
import { formatCurrency } from '@utils/common';


type Statprops = {
    title: string;
     value: string;
     icon: React.ReactNode;
     color :string
}

const StatCard = ({ title, value, icon, color }:Statprops) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 2, 
              bgcolor: `${color}.light`, 
              color: `${color}.main` 
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
);


type props = {
    totalAmount: number;
    pendingAmount: number;
    paidAmount: number;
    overDueAmount: number;
}
export const Stats = ({totalAmount, paidAmount, pendingAmount, overDueAmount}:props) => {
    return (
         <>
          <Grid item xs={12} md={3}>
            <StatCard 
              title="Total Outstanding" 
              value={`${formatCurrency(totalAmount)}`}
              icon={<AttachMoney />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard 
              title="Amount Pending" 
              value={`${formatCurrency(pendingAmount)}`}
              icon={<AccountBalanceWallet />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard 
              title="Amount Received" 
              value={`${formatCurrency(paidAmount)}`}
              icon={<TrendingUp />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard 
              title="Amount Overdue" 
              value={`${formatCurrency(overDueAmount)}`}
              icon={<TrendingDown />}
              color="error"
            />
          </Grid>
          </>
    )
}