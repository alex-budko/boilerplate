from blog_manager import BlogManager
from blog_renderer import BlogRenderer

def main():
    blog_manager = BlogManager()
    blog_renderer = BlogRenderer()

    # Example usage
    blog_manager.create_post("First Post", "This is the content of the first post.", "John Doe")
    blog_manager.create_post("Second Post", "This is the content of the second post.", "Jane Smith")

    blog_renderer.render_posts(blog_manager.get_all_posts())

if __name__ == "__main__":
    main()
