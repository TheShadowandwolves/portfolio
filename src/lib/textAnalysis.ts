export interface BubbleNode { letter: string; count: number; children: Record<string, BubbleNode> }
export function analyzeText(text: string) {
  const words = text.toLocaleLowerCase().match(/\p{L}+/gu) || [];
  const wordCounts = new Map<string, number>();
  const letterCounts = new Map<string, number>();
  const tree: BubbleNode = { letter: 'ROOT', count: words.length, children: Object.create(null) };
  for (const word of words) {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    let node = tree;
    for (const letter of word) {
      letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
      node.children[letter] ||= { letter, count: 0, children: Object.create(null) };
      node = node.children[letter]; node.count++;
    }
  }
  return { tree, totalWords: words.length, uniqueWords: wordCounts.size, letters: [...letterCounts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])), words: [...wordCounts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])) };
}
