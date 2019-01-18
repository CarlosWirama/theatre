import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import * as Tmdb from 'services/tmdbApi';
import DetailPage from 'components/DetailPage';

export default function PersonDetailPage(props) {
  return (
    <DetailPage
      detailApi={Tmdb.personDetail}
      creditApi={Tmdb.personCredits}
      imagePropertyPrefix="profile"
      descriptionPropertyName="biography"
      detailPropertyName={[
        {field: 'birthday', title: 'Born', formatter: value => moment(value).format('LL')},
        {field: 'deathday', title: 'Died', formatter: value => moment(value).format('LL')},
        {field: 'place_of_birth', title: 'Place of Birth'},
        {field: 'known_for_department', title: 'Known For'},
        {field: 'homepage', render: ({value}) => (<Anchor href={`http://${value}`}>Homepage</Anchor>)},
      ]}
      listDetailPropertyName={{
        linkTo: 'movie',
        imagePropertyPrefix: 'poster',
        titlePropertyName: 'character',
        subTitlePropertyName: 'title',
      }}
      queryString={props.location.search}
      {...props}
    />
  );
}

const Anchor = styled.a`
  color: cornflowerblue;
  text-decoration: none;
`;
