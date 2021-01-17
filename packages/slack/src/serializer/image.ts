import { IElement } from '@slackpanda/shared';

function image(node: IElement) {
  return {
    type: 'image',
    image_url: node.props.src,
    alt_text: node.props.alt,
  };
}

export default image;
