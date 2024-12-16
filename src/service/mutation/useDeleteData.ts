import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/request';

interface DeleteResponse {
  success: boolean; // success - muvaffaqiyatli o'chirish qilish uchun
  message: string; // message - xabar qilish uchun
}

export const useDeleteData = () => {
  const queryClient = useQueryClient(); 

  return useMutation<DeleteResponse, Error, number>({
    mutationFn: async (id: number) => {
      const response = await request.delete(`/category/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useData'] });
    },
  });
};
