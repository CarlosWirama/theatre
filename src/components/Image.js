import React from 'react';
import PropTypes from 'prop-types';
import { imageBasePath, notFoundImage } from 'constants/imagePaths';

export default function Image(props) {
  const w = props.imageSize.substring(1); // trim 'w154'
  const h = 1.5 * w; // to make it consistent for some image with different ratio
  if(props.src) {
    const src = `${imageBasePath[props.imageSize]}${props.src}`;
    return <img src={src} width={w} height={h} />
  } else {
    return <img width={w} height={h} src={notFoundImage} />
  }
}

Image.propTypes = {
  src: PropTypes.string,
  imageSize: PropTypes.string,
}

Image.defaultProps = {
  src: '',
  imageSize: 'w154',
}