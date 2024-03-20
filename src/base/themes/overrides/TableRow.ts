// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableRow() {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#F0F0F094',
        
          },
          '&:last-of-type': {
            '& .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },
          '& .MuiTableCell-root': {
            '&:last-of-type': {
              paddingRight: 24,
            },
            '&:first-of-type': {
              //paddingLeft: 24
            },
          },
        },
      },
    },
  };
}
