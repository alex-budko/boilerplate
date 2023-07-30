from blog_post import BlogPost

class BlogRenderer:
    def render_posts(self, posts):
        for i, post in enumerate(posts):
            print(f"Post {i+1}:")
            print(f"Title: {post.title}")
            print(f"Content: {post.content}")
            print(f"Author: {post.author}")
            print(f"Publication Date: {post.publication_date}")
            print()
