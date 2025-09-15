import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import { getRandomId } from "../functions/getRandomId";

export type TocNode = Element & { id: string };

export const rehypeCollapsableToc = () => {
  return (tree: Root) => {
    let tocList: TocNode[] = [];
    let parentToc: TocNode | undefined = undefined;
    let currentToc: TocNode | undefined = undefined;

    visit(tree, "element", (node) => {
      if (!/^h[2-6]$/.test(node.tagName)) {
        return;
      }

      const result = visitorCallback(node, tocList, parentToc, currentToc);
      tocList = result.tocList;
      parentToc = result.parentToc;
      currentToc = result.currentToc;
    });

    const detailsElement = createCollapsableToc(tocList);
    tree.children.unshift(detailsElement);
  };
};

export const visitorCallback = (
  node: Element,
  tocList: TocNode[],
  parentToc: TocNode | undefined,
  currentToc: TocNode | undefined
) => {
  const headingLevel = getHeadingLevel(node);
  const liElement = createListItemElement(node);
  // h2ならtocListに直接追加
  if (headingLevel === 2) {
    return {
      tocList: [...tocList, liElement],
      parentToc,
      currentToc: liElement,
    };
  }

  if (!currentToc) {
    throw new Error("Current TOC is undefined");
  }

  // ネストを1つ深くし、子要素に追加
  if (headingLevel > getHeadingLevelFromTextNode(currentToc)) {
    const ulElement = createUListElement();
    ulElement.children.push(liElement);
    currentToc.children.push(ulElement);
    return {
      tocList,
      parentToc: currentToc,
      currentToc: liElement,
    };
  }

  if (!parentToc) {
    throw new Error("Parent TOC is undefined");
  }

  // 同じネストレベルの兄弟要素に追加
  if (headingLevel === getHeadingLevelFromTextNode(currentToc)) {
    const parentChildren = parentToc.children.find(
      (child) => child.type === "element" && child.tagName === "ul"
    ) as TocNode;
    if (!parentChildren) {
      throw new Error("Parent TOC children is undefined");
    }
    parentChildren.children.push(liElement);
    return {
      tocList,
      parentToc,
      currentToc: liElement,
    };
  }

  // ネストを1つ浅くし、追加
  parentToc = searchParentTocElement(tocList, parentToc.id);
  if (!parentToc) {
    throw new Error("Parent TOC is undefined");
  }
  parentToc.children.push(liElement);
  return {
    tocList,
    parentToc,
    currentToc: liElement,
  };
};

const searchParentTocElement = (
  tocList: TocNode[],
  id: string
): TocNode | undefined => {
  for (const toc of tocList) {
    if (toc.id === id) {
      return toc;
    }
    const ulElement = toc.children.find(
      (child) => child.type === "element" && child.tagName === "ul"
    ) as TocNode | undefined;
    if (!ulElement) {
      continue;
    }

    const found = searchParentTocElement(
      ulElement.children.filter(
        (child) => child.type === "element"
      ) as TocNode[],
      id
    );
    if (found) {
      return ulElement;
    }
  }
  return undefined;
};

const getHeadingLevel = (node: Element): number => {
  const headingLevel = Number(node.tagName.charAt(1));
  return headingLevel;
};
const getHeadingLevelFromTextNode = (
  liElement: TocNode | undefined
): number => {
  const headingLevelText = liElement?.children
    .find((child) => child.type === "text")
    ?.value.charAt(1);
  if (!headingLevelText) {
    return 0;
  }
  return Number(headingLevelText);
};

const createUListElement = (): TocNode => {
  return {
    type: "element",
    tagName: "ul",
    properties: {},
    children: [],
    id: getRandomId(),
  };
};

const createListItemElement = (node: Element): TocNode => {
  const headingChildren = node.children
    .map((child) => (child.type === "element" ? child.children : []))
    .flat();
  const headingText =
    headingChildren.find((child) => child.type === "text")?.value ?? "";

  return {
    type: "element",
    tagName: "li",
    properties: {},
    children: [{ type: "text", value: headingText }],
    id: getRandomId(),
  };
};

const createCollapsableToc = (tocList: TocNode[]): TocNode => {
  const ulElement: TocNode = {
    type: "element",
    tagName: "ul",
    properties: {},
    children: tocList,
    id: getRandomId(),
  };

  const summaryElement: TocNode = {
    type: "element",
    tagName: "summary",
    properties: {},
    children: [{ type: "text", value: "目次" }],
    id: getRandomId(),
  };
  const detailsElement: TocNode = {
    type: "element",
    tagName: "details",
    properties: {},
    children: [summaryElement, ulElement],
    id: getRandomId(),
  };

  return detailsElement;
};
