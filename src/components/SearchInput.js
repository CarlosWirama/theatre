import React from 'react';
import { Input } from '@material-ui/core';
import styled from 'styled-components';

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
      <StyledForm action="search">
        <StyledInput
          type="search"
          name="q"
          onChange={this.onInputChange}
          fullWidth
          disableUnderline
        />
        <SubmitButton onClick={this.onSearch}>Search</SubmitButton>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  display: flex;
`;
const StyledInput = styled(Input)`
  background: white;
  width: 100%;
  padding: 0 5px;
`;
const SubmitButton = styled.button`
  color: black;
`;