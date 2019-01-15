import React from 'react';
import queryString from 'query-string';
import Tmdb from 'services/tmdbApi';

export default class SearchResultPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: null,
      results : [],
    }
  }

  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    Tmdb.multiSearch(q)
      .then(({results}) => this.setState({ results }));
  }

  render() {
    return (
      <div>
        {this.state.results.map((movie, i) => (
          <div key={i}>{movie.title}</div>
        ))}
      </div>
    );
  }
}
