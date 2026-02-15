import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/social-account.entity';
import { CreateSocialAccountDto } from './dto/create-social-account.dto';
import { UpdateSocialAccountDto } from './dto/update-social-account.dto';

@Injectable()
export class SocialAccountsService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialAccountsRepository: Repository<SocialAccount>,
  ) {}

  create(createSocialAccountDto: CreateSocialAccountDto): Promise<SocialAccount> {
    const account = this.socialAccountsRepository.create(createSocialAccountDto);
    return this.socialAccountsRepository.save(account);
  }

  findAll(): Promise<SocialAccount[]> {
    return this.socialAccountsRepository.find();
  }

  async findOne(id: string): Promise<SocialAccount> {
    const account = await this.socialAccountsRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Social account #${id} not found`);
    }
    return account;
  }

  async update(id: string, updateSocialAccountDto: UpdateSocialAccountDto): Promise<SocialAccount> {
    await this.socialAccountsRepository.update(id, updateSocialAccountDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const account = await this.findOne(id);
    await this.socialAccountsRepository.remove(account);
  }
}
