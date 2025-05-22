//import Image from "next/image";
//"use server";
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}


// import { Suspense } from 'react'
// import StaticComponent from './StaticComponent'
// import DynamicComponent from './DynamicComponent'
// import Fallback from './Fallback'
 
// export const experimental_ppr = true
 
// export default function Page() {
//   return (
//     <>
//       <StaticComponent />
//       <Suspense fallback={<Fallback />}>
//         <DynamicComponent />
//       </Suspense>
//     </>
//   )
// }