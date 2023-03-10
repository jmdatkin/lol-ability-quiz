import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'

const updateTick = 50;

type ProgressBarProps = {
    duration: number,
    active: false,
    onUpdate: Function,
    onFinish: Function
};

export default function ProgressBar(props: ProgressBarProps) {

    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0.0);

    const progressBarRef = useRef(null);
    const progressBarWidth = useRef(0);

    const startTime = useRef(null);

    const iid = useRef(null);

    const start = function () {
        setStarted(true);
        startTime.current = Date.now();
        iid.current = setInterval(() => {
            let diffTime = Date.now() - startTime.current;
            let percentage = diffTime / props.duration;

            if (percentage >= 1.0) {
                return stop();
            }

            // if (!started) return;
            setProgress(percentage);

            if (props.onUpdate)
                props.onUpdate(percentage);

        }, updateTick);
    };

    const stop = function () {
        clearInterval(iid.current);
        setStarted(false);
        if (props.onFinish)
            props.onFinish();
    }

    useEffect(() => {
        const resize = () => {
            if (progressBarRef.current !== null)
                progressBarWidth.current = progressBarRef.current.getBoundingClientRect().width;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('resize', resize) }
    }, [progressBarRef]);

    useEffect(() => {
        start();
    }, []);

    return (
        <div ref={progressBarRef} className={`${styles.progressBar} fixed w-full h-4`}>
            <div className={`${styles.progressBarBg} fixed w-full h-4 `}></div>
            <div style={{ 'width': progress * progressBarWidth.current }} className={`${styles.progressBarProgress} fixed h-4 `}></div>
        </div>
    )
}