import { CATEGORY, TYPE } from "types/graphql";

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  assets: [
    { id: '1', category: 'founders' as CATEGORY, type: 'video' as TYPE, source: 'src' },
    { id: '42', category: 'genesis' as CATEGORY, type: 'video' as TYPE, source: 'src' },
    { id: '43', category: 'regular' as CATEGORY, type: 'video' as TYPE, source: 'src' },

  ],
})
