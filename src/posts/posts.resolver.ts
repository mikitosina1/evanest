import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DeletePostInput } from './dto/delete-post.input'; // Если хотите поддерживать удаление через DTO

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

  @Mutation(() => Post)
  deletePost(@Args('input') input: DeletePostInput) {
    return this.postsService.remove(input);
  }
}
