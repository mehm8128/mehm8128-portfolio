import { describe, expect, test } from "vitest";
import { rehype } from "rehype";
import { rehypeCollapsableToc } from "./toc";

describe("rehypeCollapsableToc", () => {
  test("h2だけのとき、同じレベルで作成される", async () => {
    const input = `
      <h2 id="heading-1"><a href="#heading-1">Heading 1</a></h2>
      <h2 id="heading-2"><a href="#heading-2">Heading 2</a></h2>
      <h2 id="heading-3"><a href="#heading-3">Heading 3</a></h2>
      `;
    const { value } = await rehype().use(rehypeCollapsableToc).process(input);
    expect(value).toMatchSnapshot();
  });
  test("h2以外で同じレベルの見出しが適切に作成される", async () => {
    const input = `
      <h2 id="heading-1"><a href="#heading-1">Heading 1</a></h2>
      <h3 id="heading-1-1"><a href="#heading-1-1">Heading 1-1</a></h3>
      <h3 id="heading-1-2"><a href="#heading-1-2">Heading 1-2</a></h3>
      <h4 id="heading-1-2-1"><a href="#heading-1-2-1">Heading 1-2-1</a></h4>
      <h4 id="heading-1-2-2"><a href="#heading-1-2-2">Heading 1-2-2</a></h4>
    `;
    const { value } = await rehype().use(rehypeCollapsableToc).process(input);
    expect(value).toMatchSnapshot();
  });
  test("低いレベルの見出しに戻るときにも適切に作成される", async () => {
    const input = `
      <h2 id="heading-1"><a href="#heading-1">Heading 1</a></h2>
      <h3 id="heading-1-1"><a href="#heading-1-1">Heading 1-1</a></h3>
      <h4 id="heading-1-1-1"><a href="#heading-1-1-1">Heading 1-1-1</a></h4>
      <h3 id="heading-2"><a href="#heading-2">Heading 2</a></h3>
      <h4 id="heading-2-1"><a href="#heading-2-1">Heading 2-1</a></h4>
      <h2 id="heading-3"><a href="#heading-3">Heading 3</a></h2>
    `;
    const { value } = await rehype().use(rehypeCollapsableToc).process(input);
    expect(value).toMatchSnapshot();
  });
});
