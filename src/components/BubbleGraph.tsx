// components/BubbleGraph.tsx

type BubbleNode = {
    letter: string;
    count: number;
    children: Record<string, BubbleNode>;
};

type RenderNode = {
    id: string;
    letter: string;
    count: number;
    x: number;
    y: number;
};

type RenderLine = {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
};

function buildRenderData(tree: BubbleNode | null) {
    const nodes: RenderNode[] = [];
    const lines: RenderLine[] = [];

    if (!tree) return { nodes, lines, width: 1000, height: 800 };

    const rootChildren = Object.values(tree.children);
    const treeWidth = 250;
    const treeHeight = 700;
    const width = document.body.clientWidth * 3;
    const height = treeHeight;
    const ringGap = 60;

    function countLeaves(node: BubbleNode): number {
        const children = Object.values(node.children);
        if (children.length === 0) return 1;
        return children.reduce((sum, child) => sum + countLeaves(child), 0);
    }

    function walk(
        node: BubbleNode,
        depth: number,
        angleStart: number,
        angleEnd: number,
        centerX: number,
        centerY: number,
        parent?: RenderNode,
        path = ""
    ) {
        const angle = (angleStart + angleEnd) / 2;
        const radiusFromCenter = depth * ringGap;

        const renderNode: RenderNode = {
            id: path,
            letter: node.letter,
            count: node.count,
            x: centerX + Math.cos(angle) * radiusFromCenter,
            y: centerY + Math.sin(angle) * radiusFromCenter,
        };

        nodes.push(renderNode);

        if (parent) {
            lines.push({
                fromX: parent.x,
                fromY: parent.y,
                toX: renderNode.x,
                toY: renderNode.y,
            });
        }

        const children = Object.values(node.children);
        const totalLeaves = children.reduce(
            (sum, child) => sum + countLeaves(child),
            0
        );

        let currentAngle = -Math.PI / 2;

        children.forEach((child, index) => {
            const childLeaves = countLeaves(child);
            const angleSize = (Math.PI * 2 * childLeaves) / totalLeaves;

            walk(
                child,
                depth + 1,
                currentAngle,
                currentAngle + angleSize,
                centerX,
                centerY,
                renderNode,
                `${path}-${child.letter}-${index}`
            );

            currentAngle += angleSize;
        });
    }

    rootChildren.forEach((firstLetterNode, index) => {
        const centerX = index * treeWidth + treeWidth / 2;
        const centerY = treeHeight / 2;

        walk(
            firstLetterNode,
            0,
            0,
            Math.PI * 2,
            centerX,
            centerY,
            undefined,
            `${firstLetterNode.letter}-${index}`
        );
    });

    return { nodes, lines, width, height };
}

export default function BubbleGraph({ tree }: { tree: BubbleNode | null }) {
    const renderData = buildRenderData(tree);

    return (
        <div className="bubble-graph-outer">
            <div className="bubble-graph-wrapper">
                <svg
                    width={renderData.width + 120}
                    height={renderData.height + 120}
                    viewBox={`-10 -30 ${renderData.width + 200} ${renderData.height + 120}`}
                >
                    {renderData.lines.map((line, index) => (
                        <line
                            key={index}
                            x1={line.fromX}
                            y1={line.fromY}
                            x2={line.toX}
                            y2={line.toY}
                            stroke="#c7d2fe"
                            strokeWidth="3"
                        />
                    ))}

                    {renderData.nodes.map((node) => {
                        const radius = Math.min(18 + node.count * 5, 60);

                        return (
                            <g key={node.id}>
                                <circle cx={node.x} cy={node.y} r={radius} fill="#4f46e5" />

                                <text
                                    x={node.x}
                                    y={node.y + 5}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="700"
                                >
                                    {node.letter}
                                </text>

                                <text
                                    x={node.x}
                                    y={node.y + radius + 18}
                                    textAnchor="middle"
                                    fill="#374151"
                                    fontSize="12"
                                >
                                    {node.count}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}