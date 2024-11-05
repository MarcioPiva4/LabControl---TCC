import dynamic from "next/dynamic";
import { LoaderFormSearch } from "@/components/LoaderForm";

const VidrariasAula  = dynamic(() => import("@/components/AulaVidraria"), 
    { 
        ssr: false, 
        loading: () => <LoaderFormSearch quantity={3}></LoaderFormSearch>
    }
);

export default async function Page(){
  const dataVidrarias = await getDataVidrarias();
  return(
    <VidrariasAula  vidrarias={dataVidrarias}></VidrariasAula>
  )
}

async function getDataVidrarias() {
  const response = await fetch('http://localhost:3000//api/vidrarias', {
    cache: 'no-cache',
});
  return await response.json();
}