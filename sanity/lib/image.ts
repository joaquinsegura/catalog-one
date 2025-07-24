import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource): ImageUrlBuilder | null => {
  if (!source) {
    return null;
  }
  return imageBuilder?.image(source);
};