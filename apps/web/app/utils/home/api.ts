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

export const getHomePage = async (params?: collectionParam): Promise<HomePageData> => {
  const cleanParams =
    params?.category && params.category.trim() && params.category !== 'undefined'
      ? { category: params.category.trim() }
      : undefined;

  const [collection, newarrival, spotlight] = await Promise.all([
    getcollectionData(cleanParams),
    getnewarrival(cleanParams),
    getsportlightdata(cleanParams),
  ]);

  const normalizedCollections = (collection.data ?? []).map((item) => ({
    ...item,
    bannerImage: resolveApiAssetUrl(item.bannerImage) ?? item.bannerImage,
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

