import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DeletePostInput } from './dto/delete-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const { title, content } = createPostInput;
    const newPost = this.postsRepository.create({ title, content });
    return this.postsRepository.save(newPost);
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    const updatedPost = this.postsRepository.merge(post, updatePostInput);
    return this.postsRepository.save(updatedPost);
  }

  async remove(deletePostInput: DeletePostInput): Promise<boolean> {
    const { id } = deletePostInput;
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    await this.postsRepository.remove(post);
    return true;
  }
}
