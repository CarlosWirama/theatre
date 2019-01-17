import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from 'components/Image';

export default function ResultItem({item}) {
  /** TODO: proper 404image, dont specify width height like this */
  const year = item.release_date
    ? `(${item.release_date.substring(0,4)})`
    : '(TV)';
  const title = item.title || item.name;
  return (
    <StyledLink to={`movie?id=${item.id}`}>
      <Image src={item.poster_path} alt={title} />
      <ResultText>
        {`${year} ${title}`}
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
