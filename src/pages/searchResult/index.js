import React from 'react';
import queryStringParser from 'query-string';
import * as Tmdb from 'services/tmdbApi';
import SearchResultLayout from './SearchResultLayout';

export default class SearchResultPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      page: null,
      results : [],
      errors: [],
    }
  }

  componentDidMount() {
    this.getSearchResult();
  }

  componentDidUpdate(prevProps, prevState) {
    const { search: prevQueryString } = prevProps.location || {};
    const { search: nextQueryString } = this.props.location || {};
    /** use != so undefined and empty-string '' will treated as equal */
    if (prevQueryString != nextQueryString) {
      this.getSearchResult();
    }
  }

  getSearchResult() {
    /** TODO: remove error before fetch, and
     * TODO: add error catch / show errors from response */
    this.setState({ isLoading: true });

    /** TODO: dont encode URL, e.g. %20 */
    /** get `q` params from URL's query string */
    const { q } = queryStringParser.parse(this.props.location.search);
    Tmdb.searchMovie(q)
      .then(response => this.setState({
        isLoading: false,
        keywords: q,
        ...response,
      }));
  }

  render() {
    const { isLoading, results, keywords } = this.state;
    return (
      <SearchResultLayout
        isLoading={isLoading}
        results={results}
        keywords={keywords}
        {...this.props}
      />
    );
  }
}
