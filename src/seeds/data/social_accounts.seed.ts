import { SocialAccount, Platform } from '../../social-accounts/entities/social-account.entity';

export const socialAccountsSeeds: Partial<SocialAccount>[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'TechStartup Co',
    profileUrl: 'https://twitter.com/techstartupco',
    platform: Platform.TWITTER,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Fitness Hub',
    profileUrl: 'https://instagram.com/fitness_hub_official',
    platform: Platform.INSTAGRAM,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Food Blogger Life',
    profileUrl: 'https://facebook.com/foodbloggerlife',
    platform: Platform.FACEBOOK,
  },
];
