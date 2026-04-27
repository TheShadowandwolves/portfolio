"use client";

import { Fragment, useState } from "react";
import BubbleGraph from "../components/bubbleGraph";
import AGGraphs from "../components/AGGraphs";

type BubbleNode = {
    letter: string;
    count: number;
    children: Record<string, BubbleNode>;
};
type WordNode = {
    word: string;
    count: number;
    letters: Array<{ letter: string, count: number }>;
}
function createBubbleTree(text: string): BubbleNode {
    const root: BubbleNode = {
        letter: "ROOT",
        count: 0,
        children: {},
    };
    const words = text
        .toLowerCase()
        .replace(/[^a-zäöüß\s]/gi, "")
        .split(/\s+/)
        .filter(Boolean);

    for (const word of words) {
        let currentNode = root;

        for (const letter of word) {
            if (!currentNode.children[letter]) {
                currentNode.children[letter] = {
                    letter,
                    count: 0,
                    children: {},
                };
            }

            currentNode = currentNode.children[letter];
            currentNode.count++;
        }
    }

    return root;
}

function createWordNodeArray(text: string) {
    const wordNodeArray: WordNode[] = [];
    const words = text
        .toLowerCase()
        .replace(/[^a-zäöüß\s]/gi, "")
        .split(/\s+/)
        .filter(Boolean);
    for (const word of words) {
        wordNodeArray.push({
            word,
            count: word.length,
            letters: word.split("").map((letter) => {
                let c = 0;
                for (let i = 0; i < words.length; i++) {
                    if (words[i] === word) {
                        c++;
                    }
                }
                return {
                    letter,
                    count: c
                };
            })
        });
    }
    return wordNodeArray;
}

export default function TexttoDataConverter() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [bubbleTree, setBubbleTree] = useState<BubbleNode | null>(null);
    const [wordNodeArray, setWordNodeArray] = useState<WordNode[] | null>(null);

    const processText = (content: string) => {
        const tree = createBubbleTree(content);
        const wordArray = createWordNodeArray(content);

        localStorage.setItem("data", content);
        setBubbleTree(tree);
        setWordNodeArray(wordArray);
        setIsDataLoaded(true);
    };

    const loadData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const text = formData.get("text") as string;
        const file = formData.get("file") as File;

        if (file && file.size > 0) {
            const reader = new FileReader();

            reader.onload = () => {
                processText(reader.result as string);
            };

            reader.readAsText(file);
            return;
        }

        if (text.trim()) {
            processText(text);
        }
    };

    const unloadData = () => {
        setIsDataLoaded(false);
        setBubbleTree(null);
        localStorage.removeItem("data");
    };

    return (
        <Fragment>
            {isDataLoaded ? (
                <div className="bubble-page">
                    <div className="title-head">
                        <button className="unload-data-button" onClick={unloadData}>
                            Unload Data
                        </button>
                        <div className="title-text">
                            {
                                wordNodeArray?.map((wordNode, index) => (
                                    <p key={index}>{wordNode.word}</p>
                                ))
                            }
                        </div>
                    </div>
                    <BubbleGraph tree={bubbleTree} />
                    <AGGraphs words={wordNodeArray} />
                </div>
            ) : (
                <form className="text-to-data-converter" onSubmit={loadData}>
                    <h1 className="text-to-data-converter-title">
                        Text to Data Converter
                    </h1>

                    <p className="text-to-data-converter-description">
                        Enter your text or upload a txt file and I will convert it to data.
                    </p>

                    <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept=".txt,text/plain"
                        className="text-to-data-converter-file"
                    />

                    <label htmlFor="file-upload" className="file-upload-label">
                        Choose TXT file
                    </label>

                    <textarea
                        name="text"
                        className="text-to-data-converter-textarea"
                        placeholder="Enter your text here"
                    />

                    <button className="text-to-data-converter-button" type="submit">
                        Load Data
                    </button>
                </form>
            )}

        </Fragment>
    );
}