// @flow
//
import { type ComponentType } from 'react';
import { connect } from 'react-redux';

import CharacterFeed from '../../components/character/feed/CharacterFeed';

type CharacterFeedPropsType = {
  onSubmit: (state: string) => void,
};

const CharacterFeedContainer: ComponentType<CharacterFeedPropsType> = connect(
  null,
  {}
)(CharacterFeed);

export default CharacterFeedContainer;
