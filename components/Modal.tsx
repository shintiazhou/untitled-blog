import { Button, Form, Input, Modal, Spin } from "antd";
import React from "react";
import { Post } from "../models/post";

type Props = {
  isLoading: boolean;
  setOpenModal: (x: boolean) => void;
  openModal: boolean;
  onSubmit: (x: Post) => void;
  buttonText: string;
  modalTitle: string;
};
const { TextArea } = Input;
const PostModal = ({
  isLoading,
  modalTitle,
  setOpenModal,
  openModal,
  onSubmit,
  buttonText,
}: Props) => {
  const [form] = Form.useForm<Post>();
  return (
    <Spin spinning={isLoading}>
      <Modal onCancel={() => setOpenModal(false)} footer={null} title={modalTitle} open={openModal}>
        <Form
          className="container max-w-[600px] flex flex-col"
          onFinish={(values) => {
            onSubmit(values);
            form.resetFields();
          }}
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
            {buttonText}
          </Button>
        </Form>
      </Modal>
    </Spin>
  );
};

export default PostModal;
