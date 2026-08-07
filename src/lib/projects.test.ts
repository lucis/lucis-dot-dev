import { describe, expect, it } from 'vitest';

import { sortPublished } from './projects';

describe('sortPublished', () => {
  it('filters drafts and sorts by order ascending', () => {
    const result = sortPublished([
      { id: 'c', data: { order: 3, draft: false } },
      { id: 'a', data: { order: 1, draft: false } },
      { id: 'hidden', data: { order: 0, draft: true } },
      { id: 'b', data: { order: 2, draft: false } },
    ]);

    expect(result.map((project) => project.id)).toEqual(['a', 'b', 'c']);
  });
});
