import React from 'react';
import PropTypes from 'prop-types';
import { imageBasePath, notFoundImage } from 'constants/imagePaths';

export default function Image(props) {
  if(props.src) {
    const src = `${imageBasePath[props.imageSize]}${props.src}`;
    return <img src={src} />
  } else {
    const w = props.imageSize.substring(1); // trim 'w154'
    return <img width={w} height={1.5 * w} src={notFoundImage} />
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