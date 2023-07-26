const API = {
  getPosts: () => {
    return fetch('/api/posts')
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },
  getPost: (id) => {
    return fetch(`/api/posts/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },
  createPost: (postData) => {
    return fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },
  updatePost: (id, postData) => {
    return fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },
};

export default API;
