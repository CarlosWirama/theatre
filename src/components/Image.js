import React from 'react';
import { imageBasePath, notFoundImage } from 'constants/imagePaths';

export default function Image(props) {
  const src = props.src
    ? `${imageBasePath}${props.src}`
    : notFoundImage;
  return(
    <img width="154" height="231" {...props} src={src} />
  );
}
