import React from 'react';
import SearchInput from 'components/SearchInput';
import styled from 'styled-components';

export default function(props) {
  return (
    <Header>
      <SearchInput {...props} />
    </Header>
  );
}

const Header = styled.div`
  position: fixed;
  background-color: #ffe65e;
  height: 36px;
  padding: 10px;
  width: calc(100% - 20px);
`;
