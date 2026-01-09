import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="btn btn-primary">Go Home</button>
      </Link>
    </div>
  )
}

export default NotFoundPage;