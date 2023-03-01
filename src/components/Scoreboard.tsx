
export default function Scoreboard(props) {

    const SlotKeys = [
        'Passive','Q','W','E','R'
    ];

    return (
        // <div className="scoreboard-wrapper absolute w-full h-full">
        //     <div className="scoreboard-modal fixed bg-black opacity-5 w-full h-full"></div>
        //     <div className="scoreboard fixed padding-6 items-center">
        //     </div>
        // </div>
        <div className="scoreboard w-full h-full md:w-1/2 md:h-auto rounded-lg ring-4 ring-purple-600 p-8 bg-purple-700 text-white flex flex-col">
            <span className="mb-4">Out of {props.numGuesses} guesses, you got {props.numCorrect} correct.</span>
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
                                    {guess.playerGuess.championName} {SlotKeys[guess.playerGuess.skillSlot]}
                                </span>
                            </td>
                            <td className="border">
                                <span>
                                    {guess.correctGuess.championName} {SlotKeys[guess.correctGuess.skillSlot]}
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