import Image from "next/image";
import { useState } from "react";

const RandomImage = ({ className = " w-20 h-20 " }: { className?: string }) => {
  const width = Math.floor(Math.random() * 700) + 700;
  const height = Math.floor(Math.random() * 500) + 500;
  const id = Math.floor(Math.random() * 1000);
  const [src, setSrc] = useState(`https://picsum.photos/id/${id}/${width}/${height}`);

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="Random Image"
      className={"object-cover " + className}
      onError={() => setSrc(`https://via.placeholder.com/100x100`)}
    />
  );
};
export default RandomImage;
