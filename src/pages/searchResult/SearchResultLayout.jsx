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
        <Heading>Result for "{props.keywords}" ...</Heading>
        { props.isLoading ? `loading...` :
          <Grid container direction="row" justify="center" alignItems="center">
            { !props.results.length ? `not found` :
              props.results.map((movie, i) => (
                <ResultItem item={movie} key={i} />
              ))
            }
          </Grid>
        }
        {/* TODO: infinite scroll from here */}
      </Content>
    </React.Fragment>
  );
}

const Content = styled.div`
  padding-top: 56px;
`;

const Heading = styled.h3`
  padding: 0 24px;
`;
