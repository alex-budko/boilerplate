from typing import List
from .blogpost import BlogPost

class BlogPostAPI:
    @staticmethod
    def get_posts() -> List[BlogPost]:
        # Implementation to fetch blog posts from the server
        pass

    @staticmethod
    def create_post(post: BlogPost):
        # Implementation to create a new blog post on the server
        pass

    @staticmethod
    def update_post(post: BlogPost):
        # Implementation to update an existing blog post on the server
        pass

    @staticmethod
    def delete_post(post: BlogPost):
        # Implementation to delete a blog post from the server
        pass
