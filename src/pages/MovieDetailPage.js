import React from 'react';
import * as Tmdb from 'services/tmdbApi';
import DetailPage from 'components/DetailPage';

export default function MovieDetailPage(props) {
  return (
    <DetailPage
      detailApi={Tmdb.movieDetail}
      creditApi={Tmdb.movieCredits}
      imagePropertyPrefix="poster"
      descriptionPropertyName="overview"
      detailPropertyName={[
        {field: 'release_date', title: 'Released year', formatter: date => date.substring(0,4)},
        {field: 'runtime', title: 'Runtime', formatter: runtime => `${runtime} mins`},
        // {field: 'popularity', title: 'Runtime', formatter: runtime => `${runtime} mins`},
      ]}
      listDetailPropertyName={{
        linkTo: 'person',
        imagePropertyPrefix: 'profile',
        titlePropertyName: 'name',
        subTitlePropertyName: 'character',
      }}
      queryString={props.location.search}
    />
  );
}
