import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '@wix/wix-i18n-config';
import s from './App.scss';
import { Board } from '../Board/Board';

/* <-- To remove demo stuff just copy-paste:
  \{?/\*\s?<--([\n\n]|.)*?-->\s?\*\/\}?
  to your search input with RegExp enabled and remove everything matched.
--> */

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  /* <-- Feel free to remove this lifecycle hook */
  /* <-- Please also remove `yoshi-template-intro` from your package.json */
  state = {};
  async componentDidMount() {} /* --> */

  render() {
    console.log('rendering app');
    return (
      <div className={s.root}>
        <Board size={6} numberOfMines={3} />
      </div>
    );
  }
}

export default withTranslation()(App);
