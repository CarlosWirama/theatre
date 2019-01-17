import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Header from 'components/Header';
import SearchInput from 'components/SearchInput';
import ResultItem from 'components/ResultItem';

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
              <ResultItem item={movie} key={i} />
            ))
          }
        </Grid>
      }
      </Content>
    </React.Fragment>
  );
}

const Content = styled.div`
  padding-top: 56px;
`;
