import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { text } from '@storybook/addon-knobs/react';

import CharacterFeed from './CharacterFeed';

storiesOf('CharacterFeed', module).add(
  'default',
  withNotes('E.g. note')(() => (
    <CharacterFeed label={text('label', 'test')} onChange={action('change2')} />
  ))
);
