import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from 'components/Image';

export default function ResultItem({ item, imageSize, showYear }) {
  /** TODO: proper 404image, dont specify width height like this */
  const year = showYear ? `(${item.release_date.substring(0,4)}) ` : '';
  const title = item.title || item.name;
  return (
    <StyledLink to={`movie?id=${item.id}`}>
      <Image src={item.poster_path} imageSize={imageSize} alt={title} />
      <ResultText>
        {`${year}${title}`}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
