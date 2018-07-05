import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { text } from '@storybook/addon-knobs/react';

import CharacterFeed from './CharacterFeed';

const exampleGameEvents = [
  { type: 'speak', args: { content: 'Some short message' } },
  { type: 'speak', args: { content: 'Other message' } },
];
storiesOf('CharacterFeed', module)
  .add(
    'default',
    withNotes('E.g. note')(() => (
      <CharacterFeed
        label={text('label', 'Write to change something')}
        onSubmit={action('Input submitted')}
        gameEvents={exampleGameEvents}
      />
    ))
  )
  .add(
    'without game events',
    withNotes('E.g. note')(() => (
      <CharacterFeed
        label={text('label', 'Write to change something')}
        onSubmit={action('Input submitted')}
        gameEvents={[]}
      />
    ))
  );
