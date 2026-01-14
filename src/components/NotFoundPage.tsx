
import Pulse from './Pulse';
// when mouse hovers over button, it moves to random positions within the viewport
function moveButton() {
    const button = document.querySelector('.nf-btn') as HTMLButtonElement;
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

}
function handleClick() {
    const base = import.meta.env.BASE_URL;
    window.location.href = base;
}
const NotFoundPage: React.FC = () => {
    
  return (
    <div className="nf-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>

        <button className="nf-btn" onMouseEnter={moveButton} onClick={handleClick}>Go Home</button>

        <Pulse />
    </div>
  )
}

export default NotFoundPage;