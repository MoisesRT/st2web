import React from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';

import store from './store';

import Menu from '../../modules/st2-menu/menu.component';
import HistoryPanel from './history-panel.component';

export default class History extends React.Component {
  static propTypes = {
    context: PropTypes.object,
    routes: PropTypes.array
  }

  render() {
    return <Provider store={store}>
      <div className="wrapper">
        <Menu {...this.props} />
        <HistoryPanel {...this.props} />
      </div>
    </Provider>;
  }
}
