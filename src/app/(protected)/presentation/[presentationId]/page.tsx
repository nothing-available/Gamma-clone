'use client';

import { getProjectById } from '@/actions/project-action';
import { themes } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd';


function Page() {

  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setSlides, setProject, currentTheme, setCurrentTheme } = useSlideStore();

  useEffect(() => {
    ; (async () => {
      try {
        const res = await getProjectById(params.presentationId as string);

        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Unable to fetch project"
          });
          redirect('/dashboard');
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        );

        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === 'light' ? 'light' : 'dark');
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));

      } catch (error) {
        console.error(error);
        toast.error("Error", {
          description: "An unexpected error occurred"
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='w-8 h-4 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <DndProvider></DndProvider>
  );
}

export default Page;