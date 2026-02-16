import { tool } from 'ai';
import { z } from 'zod';

export const generateContentIdeasTool = tool({
  description: 'Generate content ideas based on analytics',
  inputSchema: z.object({
    count: z.number(),
    topTopics: z.array(z.string()),
    bestDays: z.array(z.string()),
    bestHours: z.array(z.number()),
  }),
  execute: async ({ count, topTopics, bestDays, bestHours }) => {
    const ideas: { topic: string; day: string; hour: number }[] = [];
    for (let i = 0; i < count; i++) {
      ideas.push({
        topic: topTopics[i % topTopics.length],
        day: bestDays[i % bestDays.length],
        hour: bestHours[i % bestHours.length],
      });
    }
    return { ideas };
  },
});
