import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import queryStringParser from 'query-string';
import * as Tmdb from 'services/tmdbApi';
import Header from 'components/Header';
import Image from 'components/Image';

/** TODO: later will make this and MovieDetailPage use 1 common component */
export default class PersonDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailLoading: false,
      isCastsLoading: false,
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
    Tmdb.personDetail(id)
      .then(response => this.setState({
        isDetailLoading: false,
        ...response,
      }));
    Tmdb.personCredits(id)
      .then(({ cast }) => this.setState({
        isCastsLoading: false,
        cast,
      }));
  }

  render() {
    const {
      name,
      profile_path,
      birthday,
      place_of_birth,
      deathday,
      known_for_department,
      biography,
      homepage,
    } = this.state;
    return (
      <React.Fragment>
        <Header>
          {name || 'Loading...'}
        </Header>
        { this.state.isDetailLoading ? 'Loading' :
          <Content>
            <StyledGrid container>
              <Image src={profile_path} alt="profile-image" />
              <DetailTexts>
                <Title>Born:</Title>
                <Value>{moment(birthday).format('LL')}</Value>
                { deathday &&
                  <div>
                    <Title>Died:</Title>
                    <Value>{moment(deathday).format('LL')}</Value>
                  </div>
                }
                <Title>Place of Birth:</Title><Value>{place_of_birth}</Value>
                <Title>Known For:</Title><Value>{known_for_department}</Value>
                { homepage && <a href={`http://${homepage}`}>Homepage</a>}
              </DetailTexts>
            </StyledGrid>
              <div>{biography}</div>
            <Cast>
              {this.state.cast.map(movie =>
                <Link to={`movie?id=${movie.id}`} key={movie.id}>
                  <Person container>
                    {/** TODO: use 'w45' size for poster_path */}
                    <Image src={movie.poster_path} width="45" height="68" />
                    {/** TODO: i didn't change the component name below for easy refactor */}
                    <PersonDetailContainer>
                      <ActorName>{movie.character}</ActorName>
                      <CharacterName>{movie.title}</CharacterName>
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

const Title = styled.div`
  font-size: 11pt;
  letter-spacing: 1.5px;
  color: #ababab;
`;

const Value = styled.div`
  margin-bottom: 16px;
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
