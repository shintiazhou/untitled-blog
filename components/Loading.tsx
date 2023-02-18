import React from "react";
import { Spin } from "antd";

const Loading: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  return (
    <main
      className={`${
        fullScreen && "h-screen "
      } container mx-auto w-full flex flex-col items-center justify-center`}
    >
      <Spin />
      <span>Loading...</span>
    </main>
  );
};

export default Loading;
