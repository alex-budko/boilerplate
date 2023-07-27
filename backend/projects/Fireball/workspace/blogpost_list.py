from typing import List
from .blogpost import BlogPost

class BlogPostList:
    def __init__(self):
        self.posts: List[BlogPost] = []

    def add_post(self, post: BlogPost):
        self.posts.append(post)

    def delete_post(self, post: BlogPost):
        self.posts.remove(post)

    def get_posts(self) -> List[BlogPost]:
        return self.posts
