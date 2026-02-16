import { tool } from 'ai';
import { z } from 'zod';

export const createScheduleTool = tool({
  description: 'Create optimal posting schedule',
  inputSchema: z.object({
    postsPerWeek: z.number(),
    bestDays: z.array(z.string()),
    bestHours: z.array(z.number()),
  }),
  execute: async ({ postsPerWeek, bestDays, bestHours }) => {
    return {
      schedule: bestDays.slice(0, postsPerWeek).map((day, i) => ({
        day,
        hour: bestHours[i % bestHours.length],
      })),
    };
  },
});
