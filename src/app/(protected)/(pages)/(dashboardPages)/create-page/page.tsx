import { Suspense } from "react";
import SkeltonPage from "./_components/CreatePage/SkeltonPage";
import RenderPage from "./_components/RenderPage";

export default function Page() {
  return (
    <main className='w-full h-full pt-6'>
      <Suspense fallback={<SkeltonPage />}>
        <RenderPage />
      </Suspense>
    </main>
  );
}
