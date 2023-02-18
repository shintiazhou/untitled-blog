import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import RandomImage from "../components/RandomImage";
import { Posts, Post } from "../models/post";
import { Button } from "antd";
import Card from "../components/Card";
import { fetchAllPost } from "../api/postQueries";

export default function Home({ posts }: Posts) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Untitled Blog</title>
        <meta name="description" content="Untitled Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {posts ? (
        <main className="container mx-auto p-6  flex flex-col gap-10">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl mb-2">Untitled Blog</h1>
            <p>The latest industry news, interviews, technologies, and resources.</p>
          </section>
          <section className="relative">
            <RandomImage className="w-full h-[500px]" />
            <div className="bg-gradient-to-b from-black/10 to-black/80 w-full h-full absolute inset-0 " />
            <div className="absolute inset-x-0 text-white p-6 text-left bottom-0 max-w-[800px]">
              <p className="text-lg font-semibold">{posts[0].title}</p>
              <p className="text-sm mt-2">{posts[0].body}</p>
            </div>
          </section>
          <section>
            <div className="flex justify-between w-full items-center">
              <h2 className="uppercase trackingw">latest post</h2>
              <Button onClick={() => router.push("/posts")}>View All</Button>
            </div>
            <div className="my-2">
              {posts.map((post: Post) => (
                <Card post={post} key={post.id} />
              ))}
            </div>
          </section>
        </main>
      ) : (
        <Loading fullScreen />
      )}

      <footer></footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await fetchAllPost();

    return {
      props: {
        posts: posts.slice(0, 3),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
