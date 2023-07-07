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
		<div>
			<form>
				<h2>Sign In</h2>
				<div>
					<label>Username</label>
					<input
						type="text"
						placeholder="adarshbalika@gmail.com"
						required={true}
						value={login.username}
						onChange={e =>
							setLogin(login => ({ ...login, username: e.target.value }))
						}
					/>
				</div>

				<div>
					<label>
						Password
						<input
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
					</label>
				</div>
				<button type="submit" onClick={e => newLoginHandler(e)}>
					Login
				</button>
				<button onClick={guestLoginHandler}>Login as Guest</button>
				<span>
					<p>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</p>
				</span>
			</form>
		</div>
	);
}
