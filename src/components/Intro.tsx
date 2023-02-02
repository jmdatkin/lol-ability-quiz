import styles from '@/styles/Home.module.css'
import { Press_Start_2P } from '@next/font/google';
import Button from './Button';
const pressStart2P = Press_Start_2P({weight: ['400'], subsets: ['latin']});

export default function Intro(props) {

    return (
            <main className={`${styles.main}`}>
                <h3 className={`${pressStart2P.className} text-2xl`}>League of Legends Ability Quiz</h3>
            </main>
    )
}