import Head from "next/head";
import React, { useState } from "react";
import { Comment, Post } from "../../models/post";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, MenuProps, message, Modal, Popconfirm, Spin } from "antd";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { deletePost, updatePost } from "../../api/postQueries";
import RandomImage from "../../components/RandomImage";

const { TextArea } = Input;
const Post = ({ post, comments }: { post: Post; comments: Comment[] }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<Post>();

  const handleDeletePost = () => {
    try {
      setIsLoading(true);
      deletePost(post.id);
      message.success("Post deleted successfully");
      router.push("/posts");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      message.error("something went wrong");
    }
  };
  const handleUpdatePost = (values: Post) => {
    try {
      setIsLoading(true);
      updatePost({ ...values, id: post.id, userId: post.userId });
      message.success("Post updated successfully");
      setOpenModal(false);
      setIsLoading(false);
      form.resetFields();
    } catch {
      setIsLoading(false);
      message.error("something went wrong");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={() => setOpenModal(true)}>Edit post</p>,
    },
    {
      key: "2",
      label: (
        <Popconfirm
          placement="right"
          title="Delete post"
          description="Are you sure to delete this post?"
          onConfirm={handleDeletePost}
          okText="Delete Post"
          cancelText="cancel"
        >
          <p className="text-red-500">Delete post</p>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <Spin spinning={isLoading}>
        <Modal
          onCancel={() => setOpenModal(false)}
          footer={null}
          title="Update post"
          open={openModal}
        >
          <Form
            className="container max-w-[600px] flex flex-col"
            onFinish={handleUpdatePost}
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
              Update Post
            </Button>
          </Form>
        </Modal>
      </Spin>
      ;
      <div>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container max-w-[1000px] mx-auto p-6 flex flex-col gap-10">
          <section>
            <div className="flex gap-2 items-center mb-2 w-full justify-between">
              <div className="flex gap-4 items-center">
                <RandomImage className="w-12 h-12 rounded-full" />
                <div>
                  <strong>User {post.userId}</strong>
                  <p>6 Dec 2022 - 7 min read</p>
                </div>
              </div>

              <Dropdown
                className="text-2xl hover:shadow px-1 rounded-full cursor-pointer"
                menu={{ items }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <MoreOutlined className="text-2xl cursor-pointer" />
              </Dropdown>
            </div>
            <h1 className="text-2xl md:text-3xl mt-6">{post.title}</h1>
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
    </>
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
