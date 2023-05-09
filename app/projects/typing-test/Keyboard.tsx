'use client';
import { useEffect, useState } from "react";
import useEventListener from "../../../components/hooks/useEventListener";

const row1 = 'qwertyuiop'.split('');
const row2 = 'asdfghjkl'.split('');
const row3 = 'zxcvbnm'.split('');

interface props {
    className?: string
}
const Keyboard = ({ className }: props) => {
    const [pressedKey, setPressedKey] = useState('');
    
    useEventListener('keydown', (e) => {
        setPressedKey(e.key.toLowerCase());
        setTimeout(() => setPressedKey(''), 1);
    });

    return (
        <div className={className}>
            <div className="flex justify-center gap-1 my-1">
                { row1.map(letter => <Key key={`letter-${letter}`} letter={letter} pressed={pressedKey === letter} />) }
            </div>
            <div className="flex justify-center gap-1 my-1">
                { row2.map(letter => <Key key={`letter-${letter}`} letter={letter} pressed={pressedKey === letter} />) }
            </div>
            <div className="flex justify-center gap-1 my-1">
                { row3.map(letter => <Key key={`letter-${letter}`} letter={letter} pressed={pressedKey === letter} />) }
            </div>
        </div>
    )
}

const Key = ({ letter, pressed }: { letter: string, pressed: boolean }) => {
    const [styleClass, setStyleClass] = useState('');

    useEffect(() => {
        if (pressed) {
            setStyleClass('scale-125 font-bold');

            setTimeout(() => {
                setStyleClass('');
            }, 100);
        }
    }, [pressed]);

    return (
        <kbd className={`kbd kbd-lg ${styleClass}`}>{ letter }</kbd>
    )
}

export default Keyboard;