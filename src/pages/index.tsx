import Head from 'next/head'
import { Inter, Lilita_One, Nanum_Brush_Script, Poppins, Press_Start_2P, Righteous, Russo_One } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { getAbilities, getChampionNames } from 'lib/abilities'
import { useEffect, useState } from 'react'
import { SkillSlot } from 'types/SkillSlotSelect'
import { checkAnswer } from 'lib/quiz'
import Ability from 'types/Ability'
import ProgressBar from '@/components/ProgressBar'
import Game from '@/components/Game'

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

        <Game abilities={props.abilities} champions={props.champions} />

      </div>
    </>
  )
}
