type HastNode = {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
};

/**
 * remark-gfmの脚注機能が自動生成する見出し（<h2 id="footnote-label">Footnotes</h2>）を取り除くrehypeプラグイン。
 */
export function rehypeRemoveFootnoteLabel() {
	return (tree: HastNode) => {
		removeFootnoteLabel(tree);
	};
}

function removeFootnoteLabel(node: HastNode) {
	if (!node.children) {
		return;
	}

	node.children = node.children.filter((child) => !isFootnoteLabel(child));

	for (const child of node.children) {
		removeFootnoteLabel(child);
	}
}

function isFootnoteLabel(node: HastNode) {
	return (
		node.type === "element" &&
		node.tagName === "h2" &&
		node.properties?.id === "footnote-label"
	);
}
