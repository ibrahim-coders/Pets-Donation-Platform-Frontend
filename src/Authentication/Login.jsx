import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { sigin, googleLogin, gitHubLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError('Both email and password are required!');
      return;
    }

    try {
      const result = await sigin(email, password);
      setError('');
      toast.success('Login Successfully!');
      navigate(location?.state ? location.state : '/');
      form.reset();
    } catch (err) {
      console.error('Login Error:', err);
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      navigate(location?.state ? location.state : '/');
      toast.success('Login Successful with Google!');
    } catch (error) {
      console.error('Google Login Error:', error.message);
      setError(error.message || 'Google Login Failed');
      toast.error(error.message || 'Google Login Failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await gitHubLogin();
      const user = result.user;
      navigate(location?.state ? location.state : '/');
      toast.success('Signup Successful');
    } catch (error) {
      console.error('Github Login Error:', error.message);
      toast.error('Github Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Helmet>
        <title>Animals | Login</title>
      </Helmet>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="py-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                placeholder="Enter password"
                required
              />
              <span
                className="absolute inset-y-0 right-0 grid place-content-center px-4 cursor-pointer"
                onClick={handlePasswordToggle}
              >
                {showPassword ? (
                  <AiFillEye className="text-gray-400" />
                ) : (
                  <AiFillEyeInvisible className="text-gray-400" />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white mt-4"
          >
            Login
          </button>
          <div className="pt-4">
            <p className="text-sm text-gray-600">
              New here?
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-medium pl-2"
              >
                Create a New Account
              </Link>
            </p>
          </div>
        </form>
        <div className="my-4 text-center text-gray-500">OR</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center  bg-white px-4 py-2 rounded-lg  transition"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3j9GsDGbcW8ZyEOdPYr2C8peJVaFLaDwx4gcxieJjjhTJ74EcJqnjYyQpP1F2Q_2VOMM&usqp=CAU"
              alt=""
            />
            Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <FaGithub className="mr-2" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
