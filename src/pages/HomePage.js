import React from "react";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSearch() {
    console.log(this.state.searchString);
    this.props.history.push(`/search?q=${this.state.searchString}`);
  }

  render() {
    return (
      <div>
        <input type="text" name="searchString" onChange={this.onInputChange} />
        <button onClick={this.onSearch}>Search</button>
      </div>
    );
  }
}
