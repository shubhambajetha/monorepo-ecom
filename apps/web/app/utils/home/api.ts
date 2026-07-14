import {
  getcollectionData,
  getnewarrival,
  getsportlightdata,
} from '@/app/services/homeapi/homeapi';
import { collectionParam } from '@/app/types/home/hometype';

export const getHomePage = async (params: collectionParam) => {
  const [collection, newarrival, spotlight] = await Promise.all([
    getcollectionData(params),
    getnewarrival(params),
    getsportlightdata(params),
  ]);

  return {
    collection,
    newarrival,
    spotlight,
  };
};
