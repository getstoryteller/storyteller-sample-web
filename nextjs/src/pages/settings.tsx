import WebsiteHeader from '@/components/WebsiteHeader';
import '../app/globals.css';
import dynamic from 'next/dynamic';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import { GetServerSideProps } from 'next';
import EnvVariablesContextProvider from '@/contexts/EnvVariablesContext';
import Head from 'next/head';

const SettingsForm = dynamic(() => import('@/components/SettingsForm'), {
  ssr: false,
});

interface SettingsProps {
  storytellerApiKey: string;
  amplitudeApiKey: string;
}

const Settings = ({ storytellerApiKey, amplitudeApiKey }: SettingsProps) => {
  return (
    <>
      <Head>
        <title>Storyteller Web SDK Sample | NextJS</title>
      </Head>
      <EnvVariablesContextProvider
        storytellerApiKey={storytellerApiKey}
        amplitudeApiKey={amplitudeApiKey}
      >
        <StorytellerContextProvider>
          <WebsiteHeader />
          <main className="container mx-auto p-6 lg:px-0">
            <SettingsForm />
          </main>
        </StorytellerContextProvider>
      </EnvVariablesContextProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const storytellerApiKey = process.env.STORYTELLER_API_KEY;
  const amplitudeApiKey = process.env.AMPLITUDE_API_KEY || null;

  return { props: { storytellerApiKey, amplitudeApiKey } };
};

export default Settings;
