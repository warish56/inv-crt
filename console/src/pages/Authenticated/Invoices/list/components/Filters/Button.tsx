import { 
    FilterList,
  } from '@mui/icons-material';
import { GradientButton } from "@components/GradientButton";
type props ={
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    active?: boolean;
}
export const FilterButton = ({handleClick, active}:props) => {
    return(
        <GradientButton 
         active={active}
         onClick={handleClick}
         icon={<FilterList sx={{color:active ? 'primary.contrastText' :'primary.main'}}/>}
        >
            Filters
        </GradientButton>
    )
}