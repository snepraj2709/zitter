import { useState, useReducer, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import {
  validateOnlyString,
  validateStringAndNumber,
  validatePassword
} from '../../utils/inputChecks';

export default function SignUp() {
  const { token } = useAuth();
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    fnameError: '',
    lnameError:'',
    usernameError: '',
    passwordError: '',
    confirmPasswordError: ''
  });
  const { signupHandler } = useAuth();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    let newAlertMessage = {
      ...alertMessage,
      error: false,
      fnameError: '',
      lnameError:'',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: ''
    };

    if (state.firstName === '') {
      newAlertMessage.error = true;
      newAlertMessage.fnameError = 'First Name can not be empty';
    }

    if (state.lastName === '') {
      newAlertMessage.error = true;
      newAlertMessage.lnameError = 'Last Name can not be empty';
    }

    if (state.username === '') {
      newAlertMessage.error = true;
      newAlertMessage.usernameError = 'Email can not be empty';
    }

    if (state.password === '') {
      newAlertMessage.error = true;
      newAlertMessage.passwordError = 'Password can not be empty';
    }

    if (!newAlertMessage.error) {
      signupHandler(state.username, state.password, state.firstName,state.lastName);
    }
    setAlertMessage(newAlertMessage);
  };

  const signupReducer = (state, action) => {
  switch (action.type) {
    case "firstName": {
      state.firstName = action.payload;
      if (!validateOnlyString(action.payload)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: true,
          fnameError: "Enter a valid firstName",
        }));
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: false,
          fnameError: "",
        }));
      }
      return state;
    }
    case "lastName": {
      state.lastName = action.payload;
      if (!validateOnlyString(action.payload)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: true,
          lnameError: "Enter a valid lastName",
        }));
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: false,
          lnameError: "",
        }));
      }
      return state;
    }
    case "username": {
      state.username = action.payload;
      if (!validateStringAndNumber(action.payload)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: true,
          usernameError: "Enter a valid username",
        }));
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: false,
          usernameError: "",
        }));
      }
      return state;
    }
    case "password": {
      state.password = action.payload;

      if (!validatePassword(action.payload)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: true,
          passwordError: "Password should be 8-20 characters long",
        }));
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: false,
          passwordError: "",
        }));
      }
      return state;
    }

    case "confirmPassword": {
      state.confirmPassword = action.payload;
      if (!passwordMatched(state.password, state.confirmPassword)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: true,
          confirmPasswordError: "Password and confirm password did not matched",
        }));
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          error: false,
          confirmPasswordError: "",
        }));
      }
      return state;
    }
    default:
      return state;
  }
};

  const passwordMatched = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const [state, dispatch] = useReducer(signupReducer, {
    firstName: '',
    lastName:'',
    username: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form className="w-80 bg-white shadow-md rounded px-8 py-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${alertMessage.fnameError ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Adarsh"
            required={true}
            value={state.firstName}
            onChange={e => dispatch({ type: 'firstName', payload: e.target.value })}
          />
          {alertMessage?.fnameError && (
            <div className="text-red-500 text-xs mt-1">{alertMessage?.fnameError}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${alertMessage.lnameError ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Balika"
            required={true}
            value={state.lastName}
            onChange={e => dispatch({ type: 'lastName', payload: e.target.value })}
          />
          {alertMessage?.lnameError && (
            <div className="text-red-500 text-xs mt-1">{alertMessage?.lnameError}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${alertMessage.usernameError ? 'border-red-500' : ''}`}
            type="text"
            placeholder="adarshbalika"
            required={true}
            value={state.username}
            onChange={e => dispatch({ type: 'username', payload: e.target.value })}
          />
          {alertMessage?.usernameError && (
            <div className="text-red-500 text-xs mt-1">{alertMessage?.usernameError}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${alertMessage.passwordError ? 'border-red-500' : ''}`}
            type="password"
            required={true}
            value={state.password}
            onChange={e => dispatch({ type: 'password', payload: e.target.value })}
          />
          {alertMessage?.passwordError && (
            <div className="text-red-500 text-xs mt-1">{alertMessage?.passwordError}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${alertMessage.confirmPasswordError ? 'border-red-500' : ''}`}
            type="password"
            required={true}
            value={state.confirmPassword}
            onChange={e => dispatch({ type: 'confirmPassword', payload: e.target.value })}
          />
          {alertMessage?.confirmPasswordError && (
            <div className="text-red-500 text-xs mt-1">{alertMessage?.confirmPasswordError}</div>
          )}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={(e)=>submitHandler(e)}
        >
          Create New Account
        </button>

        <div className="mt-4">
          <p>Already have an account?</p>
          <Link
            className="text-blue-500 hover:text-blue-700 font-bold"
            to="/login"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
