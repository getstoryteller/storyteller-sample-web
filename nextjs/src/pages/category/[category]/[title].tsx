import CategoryView from '@/components/CategoryView';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import { GetServerSideProps } from 'next';
import EnvVariablesContextProvider from '@/contexts/EnvVariablesContext';
import WebsiteHeader from '@/components/WebsiteHeader';
import Head from 'next/head';

interface CategoryPageProps {
  storytellerApiKey: string;
  amplitudeApiKey: string;
}

const CategoryPage = ({
  storytellerApiKey,
  amplitudeApiKey,
}: CategoryPageProps) => {
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
              <CategoryView />
            </main>
          </AmplitudeContextProvider>
        </StorytellerContextProvider>
      </EnvVariablesContextProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const storytellerApiKey = process.env.STORYTELLER_API_KEY;
  const amplitudeApiKey = process.env.AMPLITUDE_API_KEY;

  return { props: { storytellerApiKey, amplitudeApiKey } };
};

export default CategoryPage;
