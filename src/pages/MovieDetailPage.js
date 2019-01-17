import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import queryStringParser from 'query-string';
import * as Tmdb from 'services/tmdbApi';
import Header from 'components/Header';
import Image from 'components/Image';

export default class MovieDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailLoading: false,
      isCastsLoading: false,
      release_date: '',
      cast: [],
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    /** TODO: remove error before fetch, and
     * TODO: add error catch / show errors from response */
    this.setState({ isDetailLoading: true, isCastsLoading: true });

    /** get `q` params from URL's query string */
    const { id } = queryStringParser.parse(this.props.location.search);
    Tmdb.movieDetail(id)
      .then(response => this.setState({
        isDetailLoading: false,
        ...response,
      }));
    Tmdb.movieCredits(id)
      .then(({ cast }) => this.setState({
        isCastsLoading: false,
        cast,
      }));
  }

  render() {
    const title = this.state.title || this.state.name || 'Loading...';
    const { poster_path, popularity, overview, runtime } = this.state;
    const release_year = this.state.release_date.substring(0,4);
    return (
      <React.Fragment>
        <Header>
          {title}
        </Header>
        { this.state.isDetailLoading ? 'Loading' :
          <Content>
            <StyledGrid container>
              <Image src={poster_path} alt="poster-image" />
              <DetailTexts>
                <div>Released year: {release_year}</div>
                <div>Runtime: {runtime} (mins)</div>
                {/* <div>Popularity: {popularity}</div> */}
              </DetailTexts>
            </StyledGrid>
              <div>{overview}</div>
            <Cast>
              {this.state.cast.map(actor =>
                <Link to={`person?id=${actor.id}`} key={actor.id}>
                  <Person container>
                    {/** TODO: use 'w45' size for profile_path */}
                    <Image src={actor.profile_path} width="45" height="68" />
                    <PersonDetailContainer>
                      <ActorName>{actor.name}</ActorName>
                      <CharacterName>{actor.character}</CharacterName>
                    </PersonDetailContainer>
                  </Person>
                </Link>
              )}
            </Cast>
          </Content>
        }
      </React.Fragment>
    );
  }
}

const Content = styled.div`
  padding: 56px 16px 0;
`;

const StyledGrid = styled(Grid)`
  margin: 16px 0;
`;

/** TODO: (show more) button */
const DetailTexts = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const Cast = styled.div`
  margin-top: 16px;
`;

const Person = styled(Grid)`
  margin-bottom: 8px;
  cursor: pointer;
`;

const PersonDetailContainer = styled.div`
  margin-left: 8px;
  color: white;
  text-decoration: none;
`;

const ActorName = styled.div`
  font-size: 13pt;
`;

const CharacterName = styled.div`
  font-size: 11pt;
`;
