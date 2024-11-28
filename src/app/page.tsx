import { LoaderHeader } from "@/components/LoaderForm";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/Header'), { ssr: false, loading: () => <LoaderHeader></LoaderHeader> });
const Home = dynamic(() => import('@/components/LayoutPages/Home'), { ssr: false, });

export default async function Page() {
  const dataAulas = await getDataAulas();
  return (
    <>
      <Header></Header>
      <main>  
        <Home aulas={dataAulas}></Home>
      </main>
    </>
  );
}

async function getDataAulas(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aula`, {
      cache: 'no-cache',
  });
  return await response.json();
}