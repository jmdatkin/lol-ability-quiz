import { Inter, Lilita_One, Nanum_Brush_Script, Poppins, Press_Start_2P, Righteous, Russo_One } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { SkillSlot } from 'types/SkillSlotSelect'
import { checkAnswer } from 'lib/quiz'
import Ability from 'types/Ability'
import ComboBox from './ComboBox'
import SkillSlotSelect from './SkillSlotSelect'
import { Transition } from '@headlessui/react'
import Button from './Button'
import ProgressBar from './ProgressBar'

const ROUND_LENGTH = 30000;

const poppins = Poppins({ weight: ['600'], subsets: ['latin'] });
const russoOne = Russo_One({ weight: ['400'], subsets: ['latin'] });

export default function Game(props) {
    const [selectedAbility, setSelectedAbility] = useState({});
    const [selectedChampion, setSelectedChampion] = useState(props.champions[0])
    const [selectedSkillSlot, setSelectedSkillSlot] = useState(SkillSlot.INNATE);

    const [showAnswer, setShowAnswer] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(false);

    const [numGuesses, setNumGuesses] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);

    const [progressBarKey, setProgressBarKey] = useState(0);

    const [elapsedTime, setElapsedTime] = useState(0.0);

    const setRandomAbility = function () {
        setSelectedAbility(props.abilities[Math.floor(Math.random() * props.abilities.length)]);
    }

    const beginRound = function () {
        setNumCorrect(0);
        setNumGuesses(0);
        setRandomAbility();
        setProgressBarKey(progressBarKey + 1);
    };

    const checkInputtedAnswer = function () {
        const answer = checkAnswer(selectedAbility as Ability, selectedChampion, selectedSkillSlot);

        setAnswerStatus(answer);

        setNumGuesses(numGuesses + 1);
        if (answer)
            setNumCorrect(numCorrect + 1);

        setRandomAbility()

        setShowAnswer(true);
        setTimeout(() => {
            setShowAnswer(false);
        }, 3000);
    };

    useEffect(() => {
        setRandomAbility();
    }, []);


    return (
        <div className="w-full h-full">
            <ProgressBar key={progressBarKey} active={true} duration={ROUND_LENGTH}
                onUpdate={setElapsedTime} onFinish={props.onFinish}
            />
            <main className={`${styles.main}`}>
                <span className="text-lg text-white">{((elapsedTime * ROUND_LENGTH) / 1000).toFixed(1)}</span>
                <span className="text-lg text-white">{numCorrect}/{numGuesses} correct</span>
                {/* <span class="text-lg text-white">{((elapsedTime*ROUND_LENGTH)/1000).toFixed(1)}</span> */}
                <div className={styles.header}>
                    <h2 className={`${styles.abilityName} ${russoOne.className} font-medium text-6xl`}>
                        {selectedAbility.name}
                    </h2>
                </div>

                <div className={styles.content}>
                    <div>
                        <ComboBox
                            items={props.champions}
                            selectedChampion={selectedChampion}
                            setSelectedChampion={setSelectedChampion}
                        ></ComboBox>
                    </div>
                    <div>
                        <SkillSlotSelect
                            selectedSkillSlot={selectedSkillSlot}
                            setSelectedSkillSlot={setSelectedSkillSlot}
                        ></SkillSlotSelect>
                    </div>
                </div>
                <div className='h-20'>
                    <Transition show={showAnswer}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className={`${answerStatus ? 'bg-green-200 text-green-600 ring-4 ring-green-600' : 'bg-red-400 ring-4 ring-red-600 text-red-900'}
            text-center p-4 rounded-md
            `}
                        >
                            {answerStatus ? "Correct!" : "Wrong answer!"}
                        </div>
                    </Transition>

                </div>
                <div className="flex space-x-4">
                    {/* <Button label="Randomize" handleClick={setRandomAbility}></Button> */}
                    <Button label="Begin Round" handleClick={beginRound}></Button>
                    <Button label="Submit" handleClick={checkInputtedAnswer}></Button>
                </div>
            </main>
        </div>
    )
}