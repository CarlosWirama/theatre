import React from 'react';
import styled from 'styled-components';
import * as Tmdb from 'services/tmdbApi';
import Header from 'components/Header';
import SearchInput from 'components/SearchInput';
import ResultItem from 'components/ResultItem';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: {},
      nowShowing: {},
      best2018: {},
    }
  }

  componentDidMount() {
    fetchPopular()
      .then(response => this.setState({ popular: response }));
    fetchNowShowing()
      .then(response => this.setState({ nowShowing: response }));
    fetchBest2018()
      .then(response => this.setState({ best2018: response }));
  }

  render() {
    const { popular, nowShowing, best2018 } = this.state;
    return (
      <React.Fragment>
        <Header>
          <SearchInput {...this.props} />
        </Header>
        <Container>
          <Section title="Most Popular" list={popular.results} />          
          <Section title="Now Showing" list={nowShowing.results} />          
          <Section title="Best of 2018" list={best2018.results} />          
        </Container>
      </React.Fragment>
    );
  }
}

function Section({ title, list = [] }) {
  return (
    <SectionContainer>
      {title}
      <GridContainer>
        <GridList>
          {list.map((movie, i) =>
            <ResultItem item={movie} key={i} />
          )}
        </GridList>
      </GridContainer>
    </SectionContainer>
  );
}
const GridContainer = styled.div`
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`;

const GridList = styled.ul`
  flex-wrap: nowrap;
  // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  transform: translateZ(0);
  display: flex;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
  -webkit-overflow-scrolling: touch;
`;

const Container = styled.div`
  padding: 56px 16px 0;
`;

const SectionContainer = styled.div`
  margin: 16px 0;
`;

async function fetchPopular() {
  return await Tmdb.discoverPopular();
}

async function fetchNowShowing() {
  return await Tmdb.discoverNowShowing();
}

async function fetchBest2018() {
  return await Tmdb.discoverBestInYear(2018);
}
