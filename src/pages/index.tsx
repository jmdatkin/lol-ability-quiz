import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { getAbilities, getChampionNames } from 'lib/abilities'
import Game from '@/components/Game'
import { Poppins, Press_Start_2P } from '@next/font/google';
import Intro from '@/components/Intro';
import { useState } from 'react';
import Button from '@/components/Button';
import { CSSTransition } from 'react-transition-group';
import Main from '@/components/Main';
import { Transition } from '@headlessui/react';

const poppins = Poppins({ weight: ['600'], subsets: ['latin'] });

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

  const [started, setStarted] = useState(false)

  const start = function () {
    setStarted(true);
  }

  const onGameFinish = function(score) {
    console.log("Boof");
  };

  return (
    <>
      <Head>
        <title>LoL Ability Quiz</title>
        <meta name="description" content="Test your knowledge of League of Legends ability titles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${poppins.className} w-full h-full`}>
        <div className={styles.grid}>
        </div>

        <div>
          {/* <Main abilities={props.abilities} champions={props.champions} started={started}></Main> */}
          {/* <Game abilities={props.abilities} champions={props.champions} /> */}
          {/* {<Intro start={start}></Intro>} */}

          {/* <CSSTransition> */}
          {started ?
            <Game abilities={props.abilities} champions={props.champions} onFinish={onGameFinish} /> :
            <>
              <Button label="Start Game" handleClick={start}>Start Game</Button>
              <Intro></Intro>
            </>
          }
          {/* </CSSTransition> */}

        </div>

      </div>
    </>
  )
}
