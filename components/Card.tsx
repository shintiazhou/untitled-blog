import { useRouter } from "next/router";
import React from "react";
import { Post } from "../models/post";
import RandomImage from "./RandomImage";

const Card = ({ post }: { post: Post }) => {
  const router = useRouter();
  return (
    <div
      className="py-4 border-b flex flex-col md:flex-row gap-4 md:items-center justify-between cursor-pointer"
      onClick={() => router.push("/posts/" + post.id)}
    >
      <div className="max-w-[1000px]">
        <div className="flex gap-2 text-xs items-center mb-2">
          <RandomImage className="w-6 h-6 rounded-full" />
          <p>
            <strong>User {post.userId}</strong> <br />
            Best writer
          </p>
        </div>
        <div>
          <strong className="text-lg">{post.title}</strong>
          <p>{post.body}</p>
        </div>
      </div>
      <RandomImage className="w-24 h-24" />
    </div>
  );
};

export default Card;
