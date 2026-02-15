export class CreatePostDto {
  socialAccountId: string;
  content: string;
  topic?: string;
  publishedAt: Date;
  scrapedAt: Date;
  dayOfWeek?: string;
  hourOfDay?: number;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  hasImage?: boolean;
  hasVideo?: boolean;
}
