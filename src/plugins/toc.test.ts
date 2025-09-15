import { describe, expect, test } from "vitest";
import { visitorCallback, type TocNode } from "./toc";
import type { Element, Text } from "hast";

describe("toc", () => {
  describe("visitorCallback", () => {
    test("tocListに直接追加", () => {
      let tocList: TocNode[] = [];
      let parentToc: TocNode | undefined = undefined;
      let currentToc: TocNode | undefined = undefined;

      const node: Element = {
        type: "element",
        tagName: "h2",
        properties: {},
        children: [],
      };

      const result = visitorCallback(node, tocList, parentToc, currentToc);
      tocList = result.tocList;
      parentToc = result.parentToc;
      currentToc = result.currentToc;

      expect(tocList[0].tagName).toBe("li");
      expect(parentToc).toBeUndefined();
      expect(currentToc.tagName).toBe("li");
    });

    test("ネストを1つ深くし、子要素に追加", () => {
      let tocList: TocNode[] = [
        {
          type: "element",
          tagName: "li",
          properties: {},
          children: [{ type: "text", value: "h2" }],
          id: "",
        },
      ];
      let parentToc: TocNode | undefined = undefined;
      let currentToc: TocNode | undefined = tocList[0];

      const node: Element = {
        type: "element",
        tagName: "h3",
        properties: { id: "h3" },
        children: [
          {
            type: "element",
            tagName: "a",
            properties: { href: "#h3" },
            children: [
              {
                type: "text",
                value: "h3",
              },
              {
                type: "element",
                tagName: "span",
                properties: { class: "icon-link" },
                children: [{ type: "text", value: " #" }],
              },
            ],
          },
        ],
      };

      const result = visitorCallback(node, tocList, parentToc, currentToc);
      tocList = result.tocList;
      parentToc = result.parentToc;
      currentToc = result.currentToc;

      expect(
        (
          ((result.tocList[0].children[1] as Element).children[0] as Element)
            .children[0] as Text
        ).value
      ).toEqual("h3");

      expect(result.parentToc?.tagName).toBe("li");
      expect((result.parentToc?.children[0] as Text).value).toBe("h2");

      expect(result.currentToc.tagName).toBe("li");
      expect((result.currentToc.children[0] as Text).value).toBe("h3");
    });

    // TODO: 「同じネストレベルの兄弟要素に追加」と「ネストを1つ浅くし、追加」を追加
  });
});
