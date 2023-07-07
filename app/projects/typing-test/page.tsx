'use client';
import { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import { getNewSentence } from "../../../utils/typing-test";

const MAX_COMPLETED = 6;
let fails = 0;
let successes = 0;
let completed = 0;
let time = 0;
let totalWords = 0;

const Typing = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<'playing' | 'stats' | 'splash'>('splash');
    const [sentence, setSentence] = useState('');
    const [input, setInput] = useState('');
    const [incorrect, setIncorrect] = useState(-1);

    const doInput = (nextInput: string) => {
        if (state !== 'playing') {
            inputRef.current!.value = '';
            return;
        }

        // if user is backspacing, proceed
        if (nextInput.length < input.length) {
            setIncorrect(-1);
            setInput(nextInput);
            return;
        }

        // otherwise only update input if its correct
        if (sentence.substring(0, input.length + 1) === nextInput) {
            setInput(nextInput);
            setIncorrect(-1);
            successes++;
        } else {
            setIncorrect(input.length);
            fails++;
        }

    }

    const play = () => {
        if (inputRef.current) {
            setState('playing');
            inputRef.current.focus();
        }
    }

    const playAgain = () => {
        if (inputRef.current) {
            fails = 0;
            successes = 0;
            completed = 0;
            time = 0;
            totalWords = 0;
            setSentence(getNewSentence());
            setState('playing');
            inputRef.current.focus();
        }
    }

    // get the initial sentence
    useEffect(() => {
        setSentence(getNewSentence());
        document.title = 'Tim Jefferson | Typing Test'
    }, [])

    // track seconds
    useEffect(() => {
        if (state === 'playing') {
            const interval = setInterval(() => {
                time++;
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [state]);

    // determine when we're done with a sentence / should be done
    useEffect(() => {
        // if user is done typing word, get a new sentence
        if (input.length > 0 && input === sentence) {
            setInput('');

            inputRef.current!.value = '';

            if (completed + 1 === MAX_COMPLETED) {
                setState('stats');
                return;
            }

            setSentence(getNewSentence());
            completed++;
        }
    }, [input])

    useEffect(() => {
        if (sentence.length > 0) {
            totalWords += sentence.split(' ').length;
        }
    }, [sentence]);

    return (
        <div className="flex justify-start items-center flex-col h-full min-h-screen w-full pt-10">
            <div className="flex justify-center items-center h-48 text-center w-[18rem] sm:w-[32rem]">
                {
                    state === 'splash' &&
                    <div>
                        <p className="text-lg mb-4">After typing {MAX_COMPLETED} sentences, you'll recieve your accuracy and WPM (words per minute).</p>
                        <button className="btn btn-neutral uppercase" onClick={play}>start</button>
                    </div>
                }
                {
                    state === 'playing' &&
                    <div className='text-2xl'>
                        {
                            sentence.split('').map((letter, i) => {
                                return (
                                    <span
                                        key={`prompt-${letter}-${i}`}
                                        className={`${input[i] === letter && 'text-success'} ${i === input.length && 'underline'} ${incorrect === i && 'text-error'}`}
                                    >
                                        {letter}
                                    </span>
                                )
                            })
                        }
                    </div>
                }
                {
                    state === 'stats' &&
                    <div>
                        <p className='text-xl mb-4'>Keystroke accuracy: {Math.round((successes / (fails + successes)) * 100)}%</p>
                        <p className='text-xl mb-4'>Time: {time} seconds, WPM: {Math.round(totalWords / (time / 60))}</p>
                        <button className="btn uppercase" onClick={playAgain}>play again</button>
                    </div>
                }
            </div>
            <input ref={inputRef} type="text" placeholder="Type here" className="input input-bordered w-[18rem] sm:w-[34rem] mb-4" onChange={e => doInput(e.target.value)} />
            <Keyboard className="hidden sm:block" />
        </div>
    )
}

export default Typing;