import type { APIRoute } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { generateOgImage } from "../../../functions/ogImage";

type Props = CollectionEntry<"adv2024">;

export const GET: APIRoute<Props> = async ({ props }) => {
  return generateOgImage(props.data.title);
};

export async function getStaticPaths() {
  const posts = await getCollection("adv2024");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
