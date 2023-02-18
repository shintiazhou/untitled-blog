import React, { useState } from "react";
import { Post } from "../../models/post";
import { Button, Form, Input, message, Modal, Pagination, Spin } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../../components/Loading";
import RandomImage from "../../components/RandomImage";
import Card from "../../components/Card";
import { createPost, fetchAllPost } from "../../api/postQueries";
import TextArea from "antd/es/input/TextArea";

type Props = {
  posts: Post[];
  currentPage: number;
  total: number;
};

const Posts = ({ posts, currentPage, total }: Props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<Post>();
  const handleCreatePost = (values: Post) => {
    try {
      setIsLoading(true);
      createPost({ ...values, userId: 10 });
      message.success("Post created successfully");
      setOpenModal(false);
      setIsLoading(false);
      form.resetFields();
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
      <Spin spinning={isLoading}>
        <Modal
          onCancel={() => setOpenModal(false)}
          footer={null}
          title="Create new post"
          open={openModal}
        >
          <Form
            className="container max-w-[600px] flex flex-col"
            onFinish={handleCreatePost}
            layout="vertical"
            form={form}
            name="article"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Body"
              name="body"
              rules={[{ required: true, message: "Please input body!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <br />
            <Button htmlType="submit" type="primary" className="mt-4 self-end">
              Create Post
            </Button>
          </Form>
        </Modal>
      </Spin>
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
