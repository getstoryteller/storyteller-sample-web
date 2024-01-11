import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { User as StorytellerUser } from '@getstoryteller/storyteller-sdk-javascript';
import { VerticalVideoList } from '@/models/content';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import EnvVariablesContextProvider from '@/contexts/EnvVariablesContext';
import StorytellerListView from '@/components/StorytellerListView';
import WebsiteHeader from '@/components/WebsiteHeader';

import './index.module.css';

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
  const languageSetting = StorytellerUser.getUserAttribute('language') || 'en';
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
                <StorytellerListView
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

  return {
    props: {
      verticalVideoLists,
      storytellerApiKey,
      amplitudeApiKey,
    },
  };
};

export default Home;
