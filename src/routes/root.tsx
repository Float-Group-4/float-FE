import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Typography } from '@mui/material';

export default function Root() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.data),
  });
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <NavBar />
      <Typography>Hello world</Typography>
    </>
  );
}
