import Head from 'next/head'
import Image from 'next/image'
import { Inter, Lilita_One, Poppins, Press_Start_2P, Righteous, Russo_One } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { getAbilities, getChampionNames } from 'lib/abilities'
import { useEffect, useState } from 'react'
import ComboBox from '@/components/ComboBox'
import ComboBox2 from '@/components/ComboBox2'
import SkillSlotSelect from '@/components/SkillSlotSelect'
import { SkillSlot } from 'types/SkillSlotSelect'
import Button from '@/components/Button'
import { checkAnswer } from 'lib/quiz'
import Ability from 'types/Ability'
import { Transition } from '@headlessui/react'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['600'], subsets: ['latin'] });
const lilita = Lilita_One({ weight: ['400'], subsets: ['latin'] });
const righteous = Righteous({ weight: ['400'], subsets: ['latin'] });
const russoOne = Russo_One({ weight: ['400'], subsets: ['latin'] });
const pressStart2P = Press_Start_2P({ weight: ['400'], subsets: ['latin'] });


export async function getStaticProps() {
  const abilities = await getAbilities();
  const champions = await getChampionNames();
  return {
    props: {
      abilities: JSON.parse(JSON.stringify(abilities)),
      champions
    }
  }
};

export default function Home(props: any) {

  const [selectedAbility, setSelectedAbility] = useState({});
  const [selectedChampion, setSelectedChampion] = useState(props.champions[0])
  const [selectedSkillSlot, setSelectedSkillSlot] = useState(SkillSlot.INNATE);

  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(false);

  const setRandomAbility = function () {
    setSelectedAbility(props.abilities[Math.floor(Math.random() * props.abilities.length)]);
  }

  const checkInputtedAnswer = function () {
    const answer = checkAnswer(selectedAbility as Ability, selectedChampion, selectedSkillSlot);

    setAnswerStatus(answer);

    if (answer)
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
    <>
      <Head>
        <title>LoL Ability Quiz</title>
        <meta name="description" content="Test your knowledge of League of Legends ability titles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <div className={styles.grid}>
        </div>
        <main className={`${styles.main} ${poppins.className}`}>
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
          <Button label="Randomize" handleClick={setRandomAbility}></Button>
          <Button label="Submit" handleClick={checkInputtedAnswer}></Button>
          </div>
        </main>

      </div>
    </>
  )
}
