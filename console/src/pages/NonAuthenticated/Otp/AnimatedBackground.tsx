import { Box } from "@mui/material"

export const AnimatedBackground = () => {
    return (
      <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        '& > div': {
          position: 'absolute',
          borderRadius: '50%',
          opacity: 0.1,
        },
      }}
    >
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: ['200px', '300px', '250px'][i],
            height: ['200px', '300px', '250px'][i],
            left: ['10%', '60%', '30%'][i],
            top: ['20%', '15%', '60%'][i],
            background: theme => theme.palette.primary.main,
            filter: 'blur(30px)',
            animation: 'float 10s infinite',
            animationDelay: `${i * 2}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0) scale(1)' },
              '50%': { transform: 'translateY(-20px) scale(1.1)' },
            },
          }}
        />
      ))}
    </Box>
    )
}