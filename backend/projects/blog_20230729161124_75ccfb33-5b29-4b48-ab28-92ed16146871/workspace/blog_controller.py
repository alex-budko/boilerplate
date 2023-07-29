from blog_post import BlogPost
from blog_view import BlogView

class BlogController:
    def __init__(self):
        self.blog_posts = []
        self.view = BlogView()

    def create_post(self, title, content, author):
        post = BlogPost(title, content, author)
        self.blog_posts.append(post)

    def edit_post(self, post_id, title, content):
        post = self.get_post_by_id(post_id)
        if post:
            post.title = title
            post.content = content

    def delete_post(self, post_id):
        post = self.get_post_by_id(post_id)
        if post:
            self.blog_posts.remove(post)

    def get_post_by_id(self, post_id):
        for post in self.blog_posts:
            if post.id == post_id:
                return post
        return None

    def get_all_posts(self):
        return self.blog_posts

    def run(self):
        while True:
            choice = self.view.display_menu()
            if choice == "1":
                title = self.view.get_input("Enter post title: ")
                content = self.view.get_input("Enter post content: ")
                author = self.view.get_input("Enter post author: ")
                self.create_post(title, content, author)
            elif choice == "2":
                post_id = self.view.get_input("Enter post ID to edit: ")
                title = self.view.get_input("Enter new title: ")
                content = self.view.get_input("Enter new content: ")
                self.edit_post(post_id, title, content)
            elif choice == "3":
                post_id = self.view.get_input("Enter post ID to delete: ")
                self.delete_post(post_id)
            elif choice == "4":
                self.view.display_posts(self.get_all_posts())
            elif choice == "5":
                break
            else:
                self.view.display_message("Invalid choice. Please try again.")
