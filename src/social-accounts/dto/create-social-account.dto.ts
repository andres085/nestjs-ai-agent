import { Platform } from '../entities/social-account.entity';

export class CreateSocialAccountDto {
  name: string;
  platform: Platform;
  profileUrl?: string;
}
