import type { APIRoute } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { generateOgImage } from "./_ogimage";

type Props = CollectionEntry<"blog">;

export const GET: APIRoute<Props> = async ({ props }) => {
  return generateOgImage(props.data.title);
};

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
