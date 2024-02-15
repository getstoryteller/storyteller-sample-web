import { GetServerSideProps } from 'next';
import Head from 'next/head';
import CollectionView from '@/components/CollectionView';
import WebsiteHeader from '@/components/WebsiteHeader';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import EnvVariablesContextProvider from '@/contexts/EnvVariablesContext';

interface CollectionPageProps {
  storytellerApiKey: string;
  amplitudeApiKey: string;
}

const CollectionPage = ({
  storytellerApiKey,
  amplitudeApiKey,
}: CollectionPageProps) => {
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
          <AmplitudeContextProvider>
            <WebsiteHeader />
            <main className="container mx-auto max-w-[1400px] pt-2">
              <CollectionView />
            </main>
          </AmplitudeContextProvider>
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

export default CollectionPage;
