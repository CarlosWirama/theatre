import React from 'react';
import queryStringParser from 'query-string';
// import memoize from "memoize-one";
import Tmdb from 'services/tmdbApi';
import SearchInput from 'components/SearchInput';

export default class SearchResultPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      page: null,
      results : [],
    }
  }

  componentDidMount() {
    this.getSearchResult()
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
    this.setState({ isLoading: true });
    fetchSearch(this.props.location.search)
      .then(response => this.setState({
        isLoading: false,
        ...response,
      }));
  }

  render() {
    const { isLoading, results } = this.state;
    return (
      <div>
        <SearchInput {...this.props} />
        { isLoading ? `loading...` :
          <div>
            { !results.length ? `not found` :
              results.map((movie, i) => (
              <SearchResultItem item={movie} key={i} />
            ))}
          </div>
        }
      </div>
    );
  }
}

function SearchResultItem({item}) {
  return (
    <div>
      {item.title}
    </div>
  );
}

async function fetchSearch(queryString) {
  /** TODO: dont encode URL, e.g. %20 */
  /** get `q` params from URL's query string */
  const { q } = queryStringParser.parse(queryString);
  return await Tmdb.multiSearch(q);
}
