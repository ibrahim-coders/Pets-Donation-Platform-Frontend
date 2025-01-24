import { useContext, useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { imgaeUploade } from '../ImageUplode/utils';

const Register = () => {
  const { createNewUser, updateUserProfiles, googleLogin, gitHubLogin } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();
  // Handle file input change
  const handleFileChange = e => {
    const image = e.target.files[0];
    if (image) {
      setFileName(image.name);
    } else {
      setFileName('');
    }
  };

  // Toggle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle registration
  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !image) {
      setError('Name and image are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must include at least one lowercase letter.');
      return;
    }

    setError('');

    try {
      const photoURL = await imgaeUploade(image);
      const result = await createNewUser(email, password);
      await updateUserProfiles(name, photoURL);
      navigate(location?.state ? location.state : '/');
      toast.success('Signup Successful');
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Something went wrong.');
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      navigate(location?.state ? location.state : '/');
      toast.success('Signup Successful');
    } catch (error) {
      console.error('Google Login Error:', error.message);
      toast.error(error.message || 'Google Login Failed');
    }
  };

  // Handle GitHub login
  const handleGithubLogin = async () => {
    try {
      const result = await gitHubLogin();
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
        <title>Animals | Signup</title>
      </Helmet>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="py-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600 pb-2"
            >
              Select Image:
            </label>
            <input
              required
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {fileName && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {fileName}
              </p>
            )}
          </div>
          <input type="image url" re />
          <div>
            <label className="block text-sm font-medium text-gray-600">
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
            <label className="block text-sm font-medium text-gray-600">
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
                onClick={handlePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825L20.5 12l-6.625-6.825M3.5 12h16.5"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white mt-4"
          >
            Register
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Already registered?
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium pl-2"
            >
              Go to log in
            </Link>
          </p>
        </form>
        <div className="flex justify-center gap-4 mt-6">
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

export default Register;
