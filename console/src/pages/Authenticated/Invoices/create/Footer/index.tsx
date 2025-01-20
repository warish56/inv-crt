import {
  Button,
  Stack,
} from '@mui/material';

type props = {
    allStepsCompleted: boolean;
    onSave: () => void;
    isLoading: boolean;
}

export const StepFooter = ({
  allStepsCompleted,
  onSave,
  isLoading
}:props) => {

  if(!allStepsCompleted){
    return
  }
  
    return (
        <Stack
        direction="row"
        sx={{
          mt: 3,
          justifyContent: 'flex-end',
          alignItems:'center'
        }}
      >

        <Button onClick={onSave} disabled={isLoading} variant="contained">
          Save Invoice
        </Button>
      </Stack>
    )
}