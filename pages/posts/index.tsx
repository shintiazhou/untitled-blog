import React from "react";
import { Post } from "../../models/post";
import { Pagination } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../../components/Loading";
import RandomImage from "../../components/RandomImage";
import Card from "../../components/Card";
import { fetchAllPost } from "../../api/postQueries";

type Props = {
  posts: Post[];
  currentPage: number;
  total: number;
};

const Posts = ({ posts, currentPage, total }: Props) => {
  const router = useRouter();
  const onChange = (value: number) => {
    router.push(`/posts?page=${value}`);
  };
  return (
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
          <h1 className="text-2xl">Posts</h1>
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
