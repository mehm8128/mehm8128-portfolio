import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

export const rehypeCollapsableToc = () => {
  return (tree: Root) => {
    let tocList: Element[] = [];

    visit(tree, "element", (node) => {
      if (!/^h[2-6]$/.test(node.tagName)) {
        return;
      }

      visitorCallback(node, tocList);
    });

    const detailsElement = createCollapsableToc(tocList);
    tree.children.unshift(detailsElement);
  };
};

export const visitorCallback = (node: Element, tocList: Element[]) => {
  const headingLevel = getHeadingLevel(node);
  const liElement = createListItemElement(node);
  // h2ならtocListに直接追加
  if (headingLevel === 2) {
    tocList.push(liElement);
    return;
  }

  // 一番新しいh2から掘っていく
  const newestH2 = tocList[tocList.length - 1];
  const sameLevelTocElement = searchSameLevelTocElement(newestH2, headingLevel);
  if (sameLevelTocElement) {
    sameLevelTocElement.children.push(liElement);
    return;
  }

  // 見つからなかったら一番新しいh2の一番深いところに新しくulを作って追加
  const deepestTocElement = getDeepestTocElement(newestH2);
  const newUlElement = createUListElement();
  newUlElement.children.push(liElement);
  deepestTocElement.children.push(newUlElement);
};

const searchSameLevelTocElement = (
  rootElement: Element,
  level: number
): Element | undefined => {
  const rootElementHeadingLevel = getHeadingLevel(rootElement);
  if (rootElementHeadingLevel === level) {
    return rootElement;
  }

  return searchSameLevelTocElement(rootElement.children[0] as Element, level);
};

const getDeepestTocElement = (rootElement: Element): Element => {
  const ulElement = rootElement.children[
    rootElement.children.length - 1
  ] as Element;
  if (!ulElement || ulElement.tagName !== "ul") {
    return rootElement;
  }

  return getDeepestTocElement(
    ulElement.children[ulElement.children.length - 1] as Element
  );
};

const getHeadingLevel = (node: Element): number => {
  const headingLevel = Number(node.tagName.charAt(1));
  return headingLevel;
};

const createUListElement = (): Element => {
  return {
    type: "element",
    tagName: "ul",
    properties: {},
    children: [],
  };
};

const createListItemElement = (node: Element): Element => {
  const headingChildren = node.children
    .map((child) => (child.type === "element" ? child.children : []))
    .flat();
  const headingText =
    headingChildren.find((child) => child.type === "text")?.value ?? "";

  const anchorElement: Element = {
    type: "element",
    tagName: "a",
    properties: { href: `#${headingText}` },
    children: [{ type: "text", value: headingText }],
  };

  return {
    type: "element",
    tagName: "li",
    properties: {},
    children: [anchorElement],
  };
};

const createCollapsableToc = (tocList: Element[]): Element => {
  const ulElement: Element = {
    type: "element",
    tagName: "ul",
    properties: {},
    children: tocList,
  };

  const summaryElement: Element = {
    type: "element",
    tagName: "summary",
    properties: {},
    children: [{ type: "text", value: "目次" }],
  };
  const detailsElement: Element = {
    type: "element",
    tagName: "details",
    properties: {},
    children: [summaryElement, ulElement],
  };

  return detailsElement;
};
