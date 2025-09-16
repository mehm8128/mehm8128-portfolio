import type { Root, Element, ElementContent, Text } from "hast";
import { visit } from "unist-util-visit";

export const rehypeCollapsableToc = () => {
  return (tree: Root) => {
    const rootUlElement: Element = {
      type: "element",
      tagName: "ol",
      properties: {},
      children: [],
    };

    visit(tree, "element", (node) => {
      visitorCallback(node, rootUlElement);
    });

    const detailsElement = createCollapsableToc(rootUlElement);
    tree.children.unshift(detailsElement);
  };
};

export const visitorCallback = (node: Element, rootUlElement: Element) => {
  if (!/^h[2-6]$/.test(node.tagName)) {
    return;
  }

  const headingLevel = getHeadingLevelFromElement(node);
  const liElement = createListItemElement(node);
  const rootUlElementChildren = assertElementNodeList(rootUlElement.children);

  // h2ならolに直接追加
  if (headingLevel === 2) {
    rootUlElement.children.push(liElement);
    return;
  }

  // 一番新しいliから、同じレベルのheadingを入れているolを探す
  const sameLevelUlElement = searchSameLevelUlElement(
    rootUlElementChildren,
    headingLevel
  );
  if (sameLevelUlElement) {
    sameLevelUlElement.children.push(liElement);
    return;
  }

  // 一番新しいliの一番深いところに新しくolを作って追加
  const deepestLiElement = getDeepestLiElement(rootUlElementChildren);
  const newUlElement = createUlElement();
  newUlElement.children.push(liElement);
  deepestLiElement.children.push(newUlElement);
};

/**
 * 引数のolに入っている一番新しいliの中で、levelと同じ見出しレベルのli要素を返す
 */
const searchSameLevelUlElement = (
  rootUlElement: Element[],
  level: number
): Element | undefined => {
  const rootLiElement = assertElementNode(
    rootUlElement[rootUlElement.length - 1]
  );
  const headingAnchorElement = assertElementNode(rootLiElement.children[0]);
  const headingTextElement = assertElementText(
    headingAnchorElement.children[0]
  );
  const rootElementHeadingLevel = getHeadingLevelFromText(headingTextElement);
  if (rootElementHeadingLevel === level) {
    return rootLiElement;
  }

  if (rootLiElement.children[1] === undefined) {
    return;
  }
  const childUlElement = assertElementNode(rootLiElement.children[1]);

  return searchSameLevelUlElement(
    assertElementNodeList(childUlElement.children),
    level
  );
};

/**
 * 引数のolに入っている一番新しいliの中で、一番深いli要素を取得する
 */
const getDeepestLiElement = (rootUlElement: Element[]): Element => {
  const rootLiElement = assertElementNode(
    rootUlElement[rootUlElement.length - 1]
  );

  if (!rootLiElement.children[1]) {
    return rootLiElement;
  }
  const olElement = assertElementNode(rootLiElement.children[1]);

  return getDeepestLiElement(assertElementNodeList(olElement.children));
};

const getHeadingLevelFromElement = (headingElement: Element) => {
  const headingLevel = Number(headingElement.tagName.charAt(1));
  return headingLevel;
};
const getHeadingLevelFromText = (headingElement: Text) => {
  const headingLevel = Number(headingElement.value.charAt(1));
  return headingLevel;
};

const createUlElement = (): Element => {
  return {
    type: "element",
    tagName: "ol",
    properties: {},
    children: [],
  };
};

const createListItemElement = (node: Element): Element => {
  const headingChildren = node.children
    .map((child) => (child.type === "element" ? child.children : []))
    .flat();
  const headingTextElement = headingChildren.find(
    (child) => child.type === "text"
  );
  if (!headingTextElement) {
    throw new Error("見出しにテキストがありません");
  }
  const headingText = headingTextElement.value;

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

const createCollapsableToc = (rootUlElement: Element): Element => {
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
    children: [summaryElement, rootUlElement],
  };

  return detailsElement;
};

const assertElementNode = (node: ElementContent): Element => {
  if (node.type !== "element") {
    throw new Error("Elementノードではありません");
  }
  return node;
};

const assertElementNodeList = (nodeList: ElementContent[]): Element[] => {
  if (nodeList.some((node) => node.type !== "element")) {
    throw new Error("Elementノードではありません");
  }
  return nodeList as Element[];
};

const assertElementText = (node: ElementContent): Text => {
  if (node.type !== "text") {
    throw new Error("Textノードではありません");
  }
  return node;
};
