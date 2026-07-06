import { getCollectionById } from '@/app/services/collectionapi/collectionapi';
import { useQuery } from '@tanstack/react-query';

export default function useGetCollection(id: number) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollectionById(id),
    enabled: !!id,
  });
}
