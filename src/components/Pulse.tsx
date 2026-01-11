import { useEffect, useRef } from 'react';

function Pulse() {
    const timeoutsRef = useRef<number[]>([]);

    useEffect(() => {
        const circle = document.querySelector('.circle-effect') as HTMLDivElement | null;
        if (!circle) return;

        const createRippleAt = (x: number, y: number) => {
            const pulsate = document.createElement('div');
            pulsate.className = 'pulsate';
            pulsate.style.position = 'fixed';
            pulsate.style.left = `${x}px`;
            pulsate.style.top = `${y}px`;
            pulsate.style.pointerEvents = 'none';
            // create three concentric circles
            const c1 = document.createElement('div');
            c1.className = 'circle circle1';
            const c2 = document.createElement('div');
            c2.className = 'circle circle2';
            const c3 = document.createElement('div');
            c3.className = 'circle circle3';
            pulsate.appendChild(c1);
            pulsate.appendChild(c2);
            pulsate.appendChild(c3);
            document.body.appendChild(pulsate);

            // ensure animation classes start (force reflow via rAF)
            requestAnimationFrame(() => {
                c1.classList.add('animate-circle1');
                c2.classList.add('animate-circle2');
                c3.classList.add('animate-circle3');
            });

            // remove the element after animations finish (use a bit of buffer)
            const removeAfter = 1400;
            const id = window.setTimeout(() => {
                if (pulsate.parentElement) pulsate.parentElement.removeChild(pulsate);
                const i = timeoutsRef.current.indexOf(id);
                if (i !== -1) timeoutsRef.current.splice(i, 1);
            }, removeAfter);
            timeoutsRef.current.push(id);
        };

        const handlePointerDown = (e: PointerEvent) => {
            createRippleAt(e.clientX, e.clientY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // if scrolled down, adjust y position
            const scrollY = window.scrollY;
            circle.style.left = `${e.clientX}px`;
            circle.style.top = `${e.clientY + scrollY}px`;
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('mousemove', handleMouseMove);
            // clear pending timeouts and remove leftover ripples
            timeoutsRef.current.forEach(t => window.clearTimeout(t));
            timeoutsRef.current = [];
            document.querySelectorAll('.pulsate').forEach(el => el.parentElement?.removeChild(el));
        };
    }, []);

    return (
            <div className="circle-effect"></div>
    );
};

export default Pulse;
