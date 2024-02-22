import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import { textState } from '../store/recoil_state';
import NavBar from '../components/NavBar';

export default function Root() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.data),
  });
  const [text, setText] = useRecoilState(textState);
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <NavBar />
      <button
        className='p-4 mt-2 bg-red-200 rounded-full'
        onClick={() => {
          setText(text + 'a');
        }}
      >
        Click here to add more letter A (test recoil)
      </button>
      {text}
      <div>
        <h2 className='text-2xl font-bold'>Below are data fetched from React Query Example</h2>
        <pre className='m-2 border text-wrap'>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
