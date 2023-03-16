import { useEffect, useState } from "react";

enum Action {
    typing,
    clearing,
    waiting
}

enum CursorOpacity {
    opaque = 'opacity-100',
    transparent = 'opacity-0'
}

const useTypewriter = (texts: string[]) => {
    const [action, setAction] = useState<Action>(Action.typing);
    const [cursorOpacity, setCursorOpacity] = useState<CursorOpacity>(CursorOpacity.opaque);
    const [displayText, setDisplayText] = useState('');
    const [textsIndex, setTextsIndex] = useState(0);

    // text writing
    useEffect(() => {
        const timeout = setTimeout(() => {
            switch(action) {
                case Action.typing:
                    // if we finish the word, wait before clearing
                    if (displayText.length === texts[textsIndex].length) {
                        setAction(Action.waiting);
                        return;
                    }

                    // increment text
                    setDisplayText(
                        texts[textsIndex].slice(0, displayText.length + 1)
                    );
                    break;
                
                case Action.clearing:
                    // if we finished decrementing text
                    if (displayText.length === 0) {
                        // continue through texts, or loop back to first
                        if (textsIndex < texts.length - 1 ) {
                            setTextsIndex(textsIndex + 1);
                        } else {
                            setTextsIndex(0);
                        }
                        setDisplayText('');
                        setAction(Action.waiting);
                        return;
                    }

                    // decrement text
                    setDisplayText(
                        texts[textsIndex].slice(0, displayText.length - 1)
                    );
                    break;
                
                case Action.waiting:
                    setTimeout(() => setAction(displayText.length > 0 ? Action.clearing : Action.typing), 1500);
                    break;

                default:
                    return;
            }
        }, 80);

        return () => clearTimeout(timeout);
    }, [displayText, action, textsIndex]);

    // cursor blinking
    useEffect(() => {
        if (action !== Action.waiting) {
            setCursorOpacity(CursorOpacity.opaque);
            return;
        }

        const timeout = setTimeout(() => {
            setCursorOpacity(cursorOpacity === CursorOpacity.opaque ? CursorOpacity.transparent : CursorOpacity.opaque);
        }, 500);
        
        return () => clearTimeout(timeout);
    }, [cursorOpacity, action]);

    return (
        <span>
            { displayText }
            <span className={cursorOpacity}>|</span>
        </span>
    )
}

export default useTypewriter;