import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { token, loginHandler } = useAuth();
  const defaultLoginCred = {
    username: 'adarshbalika',
    password: 'adarshBalika123'
  };

  const [login, setLogin] = useState({ username: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  const guestLoginHandler = () => {
    loginHandler(defaultLoginCred.username, defaultLoginCred.password);
  };

  const newLoginHandler = e => {
    e.preventDefault();
    console.log(login);
    loginHandler(login.username, login.password);
  };

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from.pathname || '/', { replace: true });
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form className="w-80 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="adarshbalika@gmail.com"
            required={true}
            value={login.username}
            onChange={e =>
              setLogin(login => ({ ...login, username: e.target.value }))
            }
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="adarshBalika"
            required={true}
            value={login.password}
            onChange={e =>
              setLogin(login => ({
                ...login,
                password: e.target.value
              }))
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={e => newLoginHandler(e)}
          >
            Login
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={guestLoginHandler}
          >
            Login as Guest
          </button>
        </div>
        <p className="text-sm mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
