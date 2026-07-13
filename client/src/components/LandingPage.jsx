import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <Link to="/home">
        <button className="landing-button" type="button">Enter</button>
      </Link>
    </div>
  );
}
