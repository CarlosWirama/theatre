import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from 'components/SearchInput';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export default function SearchResultLayout(props) {
  return (
    <React.Fragment>
      <Header>
        <SearchInput {...props} />
      </Header>
      <Content>
      { props.isLoading ? `loading...` :
        <Grid container direction="row" justify="center" alignItems="center">
          { !props.results.length ? `not found` :
            props.results.map((movie, i) => (
              <SearchResultItem item={movie} key={i} />
            ))
          }
        </Grid>
      }
      </Content>
    </React.Fragment>
  );
}

const Header = styled.div`
  position: fixed;
  background-color: #ffe65e;
  height: 36px;
  padding: 10px;
  width: calc(100% - 20px);
`;

const Content = styled.div`
  padding-top: 56px;
`;

function SearchResultItem({item}) {
  const imgPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w154/${item.poster_path}`
    : `https://www.raynerealtyonline.com/assets/images/image-not-available.jpg`;
  /** TODO: proper 404image, dont specify width height like this */
  const year = item.release_date
    ? `(${item.release_date.substring(0,4)})`
    : '(TV)';
  return (
    <StyledLink to={`movie/${item.id}`}>
      <img src={imgPath} width="154" height="231" />
      <ResultText>
        {`${year} ${item.title || item.name}`}
        {/* {item.popularity} */}
        {/* {item.vote_average} */}
      </ResultText>
    </StyledLink>
  );
}
const StyledLink = styled(Link)`
  padding: 10px;
  color: white;
  text-decoration: none;
`;

const ResultText = styled.div`
  width: 154px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
