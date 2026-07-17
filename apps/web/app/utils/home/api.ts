import {
  getcollectionData,
  getnewarrival,
  getsportlightdata,
} from '@/app/services/homeapi/homeapi';
import { resolveApiAssetUrl } from '@/app/lib/config';
import { collectionParam, homecollection, spotlight } from '@/app/types/home/hometype';

export interface HomePageData {
  collection: homecollection[];
  newarrival: spotlight[];
  spotlight: spotlight[];
}

export const getHomePage = async (params: collectionParam): Promise<HomePageData> => {
  const [collection, newarrival, spotlight] = await Promise.all([
    getcollectionData(params),
    getnewarrival(params),
    getsportlightdata(params),
  ]);

  const normalizedCollections = (collection.data ?? []).map((item) => ({
    ...item,
    bannerImage: resolveApiAssetUrl(item.bannerImage),
  }));

  const normalizedNewArrival = (newarrival.data ?? []).map((item) => ({
    ...item,
    thumbnail: resolveApiAssetUrl(item.thumbnail) ?? item.thumbnail,
  }));

  const normalizedSpotlight = (spotlight.data ?? []).map((item) => ({
    ...item,
    thumbnail: resolveApiAssetUrl(item.thumbnail) ?? item.thumbnail,
  }));

  return {
    collection: normalizedCollections,
    newarrival: normalizedNewArrival,
    spotlight: normalizedSpotlight,
  };
};
