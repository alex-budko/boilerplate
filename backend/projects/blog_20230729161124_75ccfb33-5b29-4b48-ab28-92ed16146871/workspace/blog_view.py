class BlogView:
    def display_menu(self):
        print("1. Create a new post")
        print("2. Edit a post")
        print("3. Delete a post")
        print("4. View all posts")
        print("5. Exit")
        return input("Enter your choice: ")

    def get_input(self, prompt):
        return input(prompt)

    def display_message(self, message):
        print(message)

    def display_posts(self, posts):
        for post in posts:
            print(f"ID: {post.id}")
            print(f"Title: {post.title}")
            print(f"Content: {post.content}")
            print(f"Author: {post.author}")
            print(f"Created At: {post.created_at}")
            print("--------------------")
