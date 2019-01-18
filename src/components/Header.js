import styled from 'styled-components';
import React from 'react';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import SearchInput from 'components/SearchInput';

export default function Header({ location, history, children }) {
  const shouldDrawBackButton = location.pathname !== '/';
  return(
    <Container>
      { shouldDrawBackButton &&
        <IconButton onClick={history.goBack}>
          <ArrowBack />
        </IconButton>
      }
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  display: flex;
  font-size: 18pt;
  color: black;
  background-color: #ffe65e;
  height: 36px;
  padding: 10px;
  width: calc(100% - 20px);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  text-align: center;
  align-items: center;
  z-index: 1;
  white-space: nowrap;  
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function SearchHeader(props) {
  return (
    <Header {...props}>
      <SearchInput {...props}/>
    </Header>
  );
}
