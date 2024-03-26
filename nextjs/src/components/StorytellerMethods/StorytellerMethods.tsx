import { useState } from 'react';
import useStoryteller from '@/hooks/useStoryteller';
import { TextField } from '@/components/FormField/FormField';

import styles from './StorytellerMethods.module.scss';

// This is an example of a component that uses the Storyteller instance to call the
// openPage and openStory methods
//
// To read more about Storyteller methods, see:
// https://www.getstoryteller.com/documentation/web/additional-methods

export default function StorytellerMethods() {
  const { storytellerInstance: Storyteller } = useStoryteller();
  const [storyId, setStoryId] = useState('');
  const [pageId, setPageId] = useState('');

  if (!Storyteller) {
    return null;
  }

  return (
    <section className={styles.form}>
      <h2>Methods</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          label="Story ID"
          name="storyId"
          onChange={(e) => setStoryId(e.target.value)}
          placeholder="0000-00-00-00-000000"
          value={storyId}
          buttonProps={{
            label: 'openStory',
            disabled: !storyId,
            onClick: () => Storyteller.openStory(storyId),
          }}
        />
        <TextField
          label="Page ID"
          name="pageId"
          onChange={(e) => setPageId(e.target.value)}
          placeholder="0000-00-00-00-000000"
          value={pageId}
          buttonProps={{
            label: 'openPage',
            disabled: !pageId,
            onClick: () =>
              Storyteller.openPage(pageId, (message: string) => alert(message)),
          }}
        />
      </form>
    </section>
  );
}
