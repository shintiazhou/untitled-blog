import React, { useState } from "react";
import { Post } from "../../models/post";
import { Button, message, Pagination } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import { createPost, fetchAllPost } from "../../api/postQueries";
import PostModal from "../../components/Modal";

type Props = {
  posts: Post[];
  currentPage: number;
  total: number;
};

const Posts = ({ posts, currentPage, total }: Props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCreatePost = (values: Post) => {
    try {
      setIsLoading(true);
      createPost({ ...values, userId: 10 });
      message.success("Post created successfully");
      setOpenModal(false);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      message.error("something went wrong");
    }
  };

  const onChange = (value: number) => {
    router.push(`/posts?page=${value}`);
  };
  return (
    <>
      <PostModal
        isLoading={isLoading}
        setOpenModal={setOpenModal}
        openModal={openModal}
        onSubmit={handleCreatePost}
        buttonText={"Create Post"}
      />
      <div>
        <Head>
          <title>Posts</title>
          <meta
            name="description"
            content="Stay up-to-date with the latest posts. Our collection of articles covers a wide range of topics, from technology and business to travel and lifestyle. Browse through our curated selection of posts and find inspiration, insights, and tips to enhance your daily life."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {posts ? (
          <main className="container mx-auto p-6 flex flex-col">
            <div className="flex justify-between items-center border-b pb-3">
              <h1 className="text-2xl">Posts</h1>
              <Button type="primary" onClick={() => setOpenModal(true)}>
                Create new post
              </Button>
            </div>
            <div className="mb-10 flex flex-col lg:grid grid-cols-2 gap-x-10">
              {posts.map((post: Post) => (
                <Card post={post} key={post.id} />
              ))}
            </div>
            <div className="self-centerlg:self-end">
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                pageSize={10}
                onChange={onChange}
                current={currentPage}
                total={total}
              />
            </div>
          </main>
        ) : (
          <Loading fullScreen />
        )}
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const posts = await fetchAllPost();

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    return {
      props: {
        posts: posts.slice(startIndex, endIndex),
        currentPage: page,
        total: posts.length,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
export default Posts;
