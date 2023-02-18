import { Post } from "../models/post";

export const updatePost = async (data: Post) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${data.id}`;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const json = await response.json();
  console.log(json);
};

export const deletePost = async (postId: number) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  });
};
