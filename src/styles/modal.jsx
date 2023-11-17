import theme from './theme';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: theme.palette.secondary.main,
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  width: { xs: '90%', md: '30%' },
};
