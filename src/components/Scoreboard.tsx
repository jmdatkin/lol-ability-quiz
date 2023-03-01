import { useRef } from "react";

export default function Scoreboard(props) {

    const SlotKeys = useRef([
        'Passive','Q','W','E','R'
    ]);

    const correctRatio = useRef(props.numCorrect/props.numGuesses);

    const messagePrefix = function() {
        return correctRatio.current >= 1.0 ? 'Congratulations!' :
        correctRatio.current >= 0.66 ? 'Nice job!' :
        correctRatio.current >= 0.5 ? 'Okay!' :
        correctRatio.current >= 0.33 ? 'Uh oh!' :
        correctRatio.current >= 0.25 ? 'Yikes!':
        'Hmmm...';
    };

    return (
        // <div className="scoreboard-wrapper absolute w-full h-full">
        //     <div className="scoreboard-modal fixed bg-black opacity-5 w-full h-full"></div>
        //     <div className="scoreboard fixed padding-6 items-center">
        //     </div>
        // </div>
        <div className="scoreboard w-full h-full md:w-1/2 md:h-auto rounded-lg ring-4 ring-purple-600 p-8 bg-purple-700 text-white flex flex-col">
            <span className="mb-4">{messagePrefix()} Out of {props.numGuesses} {props.numGuesses == 1 ? 'guess' : 'guesses'}, you got {props.numCorrect} correct.</span>
            <div className="guesses-table">
                <table className="table-auto border-collapse w-full mb-4">
                    <thead>
                        <tr>
                            <td className="border">Ability Name</td>
                            <td className="border">Your Guess</td>
                            <td className="border">Correct Answer</td>
                        </tr>
                    </thead>
                    {/* {JSON.stringify(props.guesses)} */}
                    <tbody>
                    {props.guesses.map((guess, idx) => {
                        return (
                        <tr key={idx} className={guess.result ? 'bg-green-500' : 'bg-red-500'}>
                            <td className="border">
                                {guess.ability.name}
                            </td>
                            <td className="border">
                                <span>
                                    {guess.playerGuess.championName} {SlotKeys.current[guess.playerGuess.skillSlot]}
                                </span>
                            </td>
                            <td className="border">
                                <span>
                                    {guess.correctGuess.championName} {SlotKeys.current[guess.correctGuess.skillSlot]}
                                </span>
                            </td>
                        </tr>)
                        // JSON.stringify(guess)
                    })}
                    </tbody>
                </table>
            </div>
            {props.children}
        </div>
    );
};