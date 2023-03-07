import '../App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <h2>Hello dear friend. Choose one!</h2>
      <div className='card'>
        <Link to={'/register'}>
          <button>Register</button>
        </Link>
        <Link to={'/login'}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
