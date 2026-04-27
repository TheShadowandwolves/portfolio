"use client";

import {
    AllCommunityModule,
    ModuleRegistry,
    type AgCartesianChartOptions,
} from "ag-charts-community";
import { AgCharts } from "ag-charts-react";
import { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

type LetterNode = {
    letter: string;
};

type WordNode = {
    word: string;
    count: number;
    letters: LetterNode[];
};

type ChartRow = {
    word: string;
    [letter: string]: string | number;
};

function wordsToChartData(words: WordNode[] | null): {
    rows: ChartRow[];
    letters: string[];
} {
    if (!words) return { rows: [], letters: [] };

    const allLetters = new Set<string>();

    const rows = words.map((wordItem) => {
        const row: ChartRow = {
            word: wordItem.word,
        };

        for (const letterItem of wordItem.letters) {
            const letter = letterItem.letter.toLowerCase();

            allLetters.add(letter);
            row[letter] = ((row[letter] as number) || 0) + 1;
        }

        return row;
    });

    return {
        rows,
        letters: Array.from(allLetters).sort(),
    };
}

export default function AGGraphs({ words }: { words: WordNode[] | null }) {
    const { rows, letters } = useMemo(() => wordsToChartData(words), [words]);

    const chartOptions: AgCartesianChartOptions = {
        background: {
            fill: "transparent",
        },

        data: rows,
        series: letters.map((letter) => ({
            type: "bar",
            xKey: "word",
            yKey: letter,
            yName: letter,
            stacked: true,
        })),
        axes: {
            x: {
                type: "category",
                position: "bottom",
                title: {
                    text: "Word",
                },
            },
            y: {
                type: "number",
                position: "left",
                title: {
                    text: "Amount of letters",
                },
            },
        },
    };

    return (
        <div className="ag-chart-wrapper">
            <AgCharts options={chartOptions} />
        </div>
    );
}