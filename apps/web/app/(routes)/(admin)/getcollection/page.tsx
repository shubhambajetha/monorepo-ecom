import GetCollection from "@/app/components/admin/collection/GetCollection";
import { getAllCollections } from "@/app/services/collectionapi/collectionapi";

export default async function page(){
  let response;
  try{
    response = await getAllCollections();
  }catch(error){
     console.error('Failed to fetch collections:', error);
  }
return(
  <>
  <GetCollection intialData={response}/>
  </>
)
}