import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/request';

export const useGetData = () => {
  return useQuery({
    queryKey: ['useData'],
    queryFn: () => request.get('/category/').then((res) => res.data),
  });
};

