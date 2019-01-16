import React from 'react';
import SearchInput from 'components/SearchInput';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchInput {...this.props} />
      </div>
    );
  }
}
