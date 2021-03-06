import React from 'react';
import styled from 'styled-components';
import { Input, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSearch() {
    this.props.history.push(`/search?q=${this.state.q}`);
  }

  render() {
    return (
      <StyledForm action="search" >
        <StyledInput
          type="search"
          name="q"
          onChange={this.onInputChange}
          fullWidth
          disableUnderline
        />
        <IconButton onClick={this.onSearch}>
          <Search />
        </IconButton>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;
const StyledInput = styled(Input)`
  background: white;
  width: 100%;
  padding: 0 5px;
  height: 32px;
`;
