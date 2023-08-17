import { GetServerSideProps } from 'next';
import { VerticalVideoList } from '@/models/content';
import WebsiteHeader from '@/components/WebsiteHeader';
import Storyteller from '@getstoryteller/storyteller-sdk-javascript';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import StorytellerStoryUnit from '@/components/StorytellerStoryUnit';

import './index.module.css';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import EnvVariablesContextProvider from '@/contexts/EnvVariablesContext';
import Head from 'next/head';

// This page fetches a list of "Vertical Video Lists" from an API
// and renders them. This would be a common pattern if you were integrating
// with a CMS to control which Storyteller units are displayed on a page.

interface IndexProps {
  verticalVideoLists: VerticalVideoList[];
  storytellerApiKey: string;
  amplitudeApiKey: string;
}

const Home = ({
  verticalVideoLists,
  storytellerApiKey,
  amplitudeApiKey,
}: IndexProps) => {
  const languageSetting =
    Storyteller?.User?.getUserAttribute('language') || 'en';
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
            <main className="container mx-auto max-w-[1400px]">
              {verticalVideoLists.map((list: VerticalVideoList) => (
                <StorytellerStoryUnit
                  key={list.id}
                  list={list}
                  languageSetting={languageSetting}
                />
              ))}
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
  const verticalVideoListsApiURL = `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${storytellerApiKey}`;

  const entriesResponse = await fetch(verticalVideoListsApiURL);
  if (!entriesResponse.ok) {
    throw new Error('Failed to fetch data');
  }
  const { data: verticalVideoLists } = await entriesResponse.json();

  return { props: { verticalVideoLists, storytellerApiKey, amplitudeApiKey } };
};

export default Home;
