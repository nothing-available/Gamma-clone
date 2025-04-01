'use client';

import { Button } from '@/components/ui/button';
import { Theme } from '@/lib/types';
import { useSlideStore } from '@/store/useSlideStore';
import { useAnimationControls } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeCard from './ThemeCard';
import ThemePicker from './ThemePicker';
import { themes } from '@/lib/constants';


const ThemePreview = () => {

  const params = useParams();
  const router = useRouter();
  const controls = useAnimationControls();
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [params, project]);

  useEffect(() => {
    controls.start('visible');
  }, [controls, selectedTheme]);

  const leftCardContent = (

    <div className='space-y-4'>
      <div
        className='rounded-xl p-6'
        style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3 className='text-xl font-semibold mb-4'
          style={{ color: selectedTheme.accentColor }}>
          Quick Start Guide
        </h3>

        <ol
          className='list-decimal list-inside space-y-2'
          style={{ color: selectedTheme.accentColor }}>
          <li>Choose a Theme</li>
          <li>Customize color and  fonts</li>
          <li>Add your context</li>
          <li>Preview and publish</li>
        </ol>
      </div>

      <Button
        className='w-full h-12 text-lg font-medium'
        style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.accentColor }}>
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div
          className='rounded-xl p-6'
          style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it act as a  text box
          </p>
        </div>

        <div
          className='rounded-xl p-6'
          style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
          <p style={{ color: selectedTheme.accentColor }}>
            You can get these by typing / smart
          </p>
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        <Button
          className='h-12 px-6 text-lg font-medium'
          style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}>
          Primary Button
        </Button>

        <Button
          variant={'outline'}
          className='h-12 px-6 text-lg font-medium'
          style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}>
          Secondary Button
        </Button>
      </div>
    </div>
  );

  const rightCardContent = (
    <div className='space-y-6'>
      <div
        className='rounded-xl p-6'
        style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3
          className='text-xl font-semibold mb-4'
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>

        <ul
          className='list-disc list-inside space-y-2'
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive Design</li>
          <li>Dark and Light mode</li>
          <li>Custom color scheme</li>
          <li>Accessibility optimized</li>
        </ul>
      </div>
      <Button
        variant={'outline'}
        className='w-full h-12 text-lg font-medium'
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor
        }}>
        Explore Feature
      </Button>
    </div>
  );

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentTheme(theme);

  };

  return (
    <div
      className='h-screen w-full flex'
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}>
      <div className='flex-grow overflow-y-auto'>
        <div className='p-12 flex flex-col items-center min-h-screen'>
          <Button
            variant={'outline'}
            className='mb-2 self-start'
            size={'lg'}
            style={{
              backgroundColor: selectedTheme.accentColor + '10',
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + '20'
            }}
            onClick={() => router.push('/create-page')}
          >
            <ArrowLeft className='mr-2 h-5 w-5' />
            Back
          </Button>

          <div className='w-full flex justify-center items-center relative flex-grow'>
            <ThemeCard
              title='Quick Start'
              description='Get up and runing in no time'
              content={leftCardContent}
              variant='left'
              theme={selectedTheme}
              controls={controls}
            />

            <ThemeCard
              title='Main Preview'
              description='This is the main preview card'
              content={mainCardContent}
              variant='main'
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title='Theme Features'
              description='Discove what our theme can do'
              content={rightCardContent}
              variant='right'
              theme={selectedTheme}
              controls={controls}
            />
          </div>
        </div>
      </div>

      <ThemePicker
        selectedTheme={selectedTheme}
        themes={themes}
        onThemeSelected={applyTheme}
      />
    </div>
  );
};

export default ThemePreview

