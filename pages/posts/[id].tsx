import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import RandomImage from "../../components/RandomImage";
import { Comment, Post } from "../../models/post";

const Post = ({ post, comments }: { post: Post; comments: Comment[] }) => {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-[1000px] mx-auto p-6 flex flex-col gap-10">
        <section>
          <h1 className="text-2xl md:text-3xl">{post.title}</h1>
          <RandomImage className="w-full h-[400px] my-6" />
          <p className="text-justify md:text-lg">{post.body}</p>
        </section>
        <section>
          <strong className="text-xl uppercase mb-4">comments</strong>
          {comments.map((comment: Comment) => (
            <div key={comment.id} className=" py-4 border-b">
              <div className="flex gap-2 items-center mb-2">
                <RandomImage className="w-6 h-6 rounded-full" />
                <strong>User {comment.name}</strong>
              </div>
              <div>{comment.body}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${context?.params?.id}`);
  const post = await postRes.json();
  const commentRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context?.params?.id}/comments`,
  );
  const comments = await commentRes.json();

  return {
    props: {
      post,
      comments,
    },
  };
};
export default Post;
