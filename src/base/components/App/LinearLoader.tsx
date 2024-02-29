import { LinearProgressProps } from '@mui/material/LinearProgress';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import Loader from '@base/components/Loader';
// ==============================|| Loader ||============================== //

export type LinearLoaderProps = LinearProgressProps;

const LinearLoader = (props: LinearLoaderProps) => {
  const isFetching: number = useIsFetching();
  const isMutating: number = useIsMutating();

  return <>{(!!isFetching || !!isMutating) && <Loader />}</>;
};

export default LinearLoader;
