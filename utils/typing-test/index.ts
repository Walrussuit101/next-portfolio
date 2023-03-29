import sentences from "./sentences";

let usedSentencesIndexes: number[] = [];

export const getNewSentence = () => {
    // if we use all of the sentences, start using them again
    if (usedSentencesIndexes.length === sentences.length) {
        usedSentencesIndexes = [];
    };

    let index = randomNum(sentences.length);

    while (usedSentencesIndexes.includes(index)) {
        index = randomNum(sentences.length);
    }

    usedSentencesIndexes.push(index);
    return sentences[index];
}

const randomNum = (max: number) => {
    return Math.floor(Math.random() * max);
}