import { getCollectionById } from '@/app/services/collectionapi/collectionapi';
import { useQuery } from '@tanstack/react-query';

export default function useGetCollection(id?: string) {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => (id ? getCollectionById(id) : Promise.reject(new Error('No collection ID provided'))),
    enabled: Boolean(id),
  });
}
