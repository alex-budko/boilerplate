from blog_post import BlogPost

class BlogManager:
    def __init__(self):
        self.posts = []

    def create_post(self, title: str, content: str, author: str):
        post = BlogPost(title, content, author, "")
        self.posts.append(post)

    def edit_post(self, post_index: int, title: str, content: str):
        if post_index < len(self.posts):
            post = self.posts[post_index]
            post.title = title
            post.content = content

    def delete_post(self, post_index: int):
        if post_index < len(self.posts):
            del self.posts[post_index]

    def get_all_posts(self):
        return self.posts
