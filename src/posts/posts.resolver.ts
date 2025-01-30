import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  createPost(@Args('title') title: string, @Args('content') content: string) {
    return this.postsService.create(title, content);
  }
}
