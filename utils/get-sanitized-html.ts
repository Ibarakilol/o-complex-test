import DOMPurify from 'isomorphic-dompurify';

import { ALLOWED_TAGS } from '@/constants';

export const getSanitizedHtml = (html: string) => ({
  __html: DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [],
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
  }),
});
