import { useEffect, useRef, useState } from "react";

export default (options: {duration: number, onUpdate: (time: number) => void, onFinish: () => void}) => {
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0.0);

    const progressBarRef = useRef(null);
    const progressBarWidth = useRef(0);

    const startTime = useRef(-1);

    const iid = useRef<NodeJS.Timer | null>(null);

    const start = function () {
        setStarted(true);
        setProgress(0.0);
        startTime.current = Date.now();
        iid.current = setInterval(() => {
            let diffTime = Date.now() - startTime.current;
            let percentage = diffTime / options.duration;

            if (percentage >= 1.0) {
                return stop();
            }

            // if (!started) return;
            setProgress(percentage);

            if (options.onUpdate)
                options.onUpdate(percentage);

        }, 50);
    };

    const stop = function () {
        clearInterval(iid.current as NodeJS.Timer);
        setStarted(false);
        if (options.onFinish)
            options.onFinish();
    }

    useEffect(() => {
        const resize = () => {
            if (progressBarRef.current !== null)
                progressBarWidth.current = (progressBarRef.current as HTMLElement).getBoundingClientRect().width;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('resize', resize) }
    }, [progressBarRef]);

    useEffect(() => {
        start();
    }, []);

    return {
        ref: progressBarRef,
        progress,
        progressBarWidth,
        start,
        stop
    }
}