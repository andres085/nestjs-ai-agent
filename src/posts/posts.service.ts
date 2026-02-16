import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) { }

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async findPerformanceAnalytics(socialAccountId: string, daysAgo: number) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

    const bestDays = await this.postsRepository
      .createQueryBuilder('post')
      .select('post.dayOfWeek', 'day')
      .addSelect('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .groupBy('post.dayOfWeek')
      .orderBy('AVG(post.likesCount)', 'DESC')
      .limit(3)
      .getRawMany();

    const bestHours = await this.postsRepository
      .createQueryBuilder('post')
      .select('post.hourOfDay', 'hour')
      .addSelect('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .groupBy('post.hourOfDay')
      .orderBy('AVG(post.likesCount)', 'DESC')
      .limit(3)
      .getRawMany();

    const topTopics = await this.postsRepository
      .createQueryBuilder('post')
      .select('post.topic', 'topic')
      .addSelect('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .andWhere('post.topic IS NOT NULL')
      .groupBy('post.topic')
      .orderBy('AVG(post.likesCount)', 'DESC')
      .limit(5)
      .getRawMany();

    const withImage = await this.postsRepository
      .createQueryBuilder('post')
      .select('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .andWhere('post.hasImage = :hasImage', { hasImage: true })
      .getRawOne();

    const withoutImage = await this.postsRepository
      .createQueryBuilder('post')
      .select('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .andWhere('post.hasImage = :hasImage', { hasImage: false })
      .getRawOne();

    const withVideo = await this.postsRepository
      .createQueryBuilder('post')
      .select('AVG(post.likesCount)', 'avgLikes')
      .where('post.socialAccountId = :socialAccountId', { socialAccountId })
      .andWhere('post.publishedAt >= :cutoffDate', { cutoffDate })
      .andWhere('post.hasVideo = :hasVideo', { hasVideo: true })
      .getRawOne();

    return {
      bestDays: bestDays.map((d) => d.day),
      bestHours: bestHours.map((h) => parseInt(h.hour)),
      topTopics: topTopics.map((t) => ({
        topic: t.topic,
        avgLikes: Math.round(parseFloat(t.avgLikes)),
      })),
      contentPatterns: {
        withImage: {
          avgLikes: Math.round(parseFloat(withImage?.avgLikes || '0')),
        },
        withoutImage: {
          avgLikes: Math.round(parseFloat(withoutImage?.avgLikes || '0')),
        },
        withVideo: {
          avgLikes: Math.round(parseFloat(withVideo?.avgLikes || '0')),
        },
      },
    };
  }

  findAll(socialAccountId?: string): Promise<Post[]> {
    if (socialAccountId) {
      return this.postsRepository.find({
        where: { socialAccountId },
        relations: ['socialAccount'],
        order: { publishedAt: 'DESC' },
      });
    }
    return this.postsRepository.find({
      relations: ['socialAccount'],
      order: { publishedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['socialAccount'],
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
