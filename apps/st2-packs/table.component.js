import _ from 'lodash';
import React from 'react';
import { PropTypes } from 'prop-types';

export default class Table extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.node),
  }

  render() {
    const { content, ...props } = this.props;

    return (
      <div {...props} className="st2-details__panel-body" >
        { _(content).pickBy((v) => !!v).map((value, key) => (
          <dl key={key} className="st2-details__panel-body-line">
            <dt className="st2-details__panel-body-label">{ key }</dt>
            <dd className="st2-details__panel-body-value">{ value }</dd>
          </dl>
        )).value() }
      </div>
    );
  }
}
