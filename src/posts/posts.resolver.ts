import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DeletePostInput } from './dto/delete-post.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input);
  }

  @Mutation(() => Post)
  updatePost(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input.id, input);
  }

  @Mutation(() => Post, { nullable: true })
  async deletePost(@Args('id', ParseIntPipe) id: DeletePostInput): Promise<boolean> {
    return this.postsService.remove(id);
  }
}
