import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// when mouse hovers over button, it moves to random positions within the viewport
function moveButton() {
    const button = document.querySelector('.nf-btn') as HTMLButtonElement;
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

}
const NotFoundPage: React.FC = () => {
    useEffect(() => {
        const circle = document.querySelector('.circle-effect') as HTMLDivElement;
        if (!circle) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
  return (
    <div className="nf-container">
    <div className="circle-effect"></div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="nf-btn" onMouseEnter={moveButton}>Go Home</button>
      </Link>
    </div>
  )
}

export default NotFoundPage;