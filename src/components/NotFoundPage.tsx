import { Link } from 'react-router-dom';
// when mouse hovers over button, it moves to random positions within the viewport
function moveButton() {
    const button = document.querySelector('.nf-btn') as HTMLButtonElement;
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

}
// follow the mouse cursor with a circle effect
function showCircleEffect() {
    // hide mouse cursor
    document.body.style.cursor = 'none';
    const circle = document.querySelector('.circle-effect') as HTMLDivElement;
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    });
}
showCircleEffect();

const NotFoundPage: React.FC = () => {
    
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