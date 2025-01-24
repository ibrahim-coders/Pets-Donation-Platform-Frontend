import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Authentication/Firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext(null);
import '../App.css';
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const providerGithub = new GithubAuthProvider();

  // Create User
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In
  const sigin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log Out
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // Update Profile
  const updateUserProfiles = (name, photo) => {
    const user = auth.currentUser;
    if (user) {
      return updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
    } else {
      return Promise.reject(new Error('No user is currently logged in'));
    }
  };
  //github login
  const gitHubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, providerGithub);
  };
  //obserbar
  useEffect(() => {
    const keepUser = onAuthStateChanged(auth, async currentUser => {
      setLoading(true);

      if (currentUser?.email) {
        setUser(currentUser);

        try {
          // Update user data on the server
          await axios.post(
            `${import.meta.env.VITE_BASEURL}/users/${currentUser?.email}`,
            {
              name: currentUser?.displayName,
              image: currentUser?.photoURL,
              email: currentUser?.email,
            }
          );

          // Request JWT token
          const userInfo = currentUser?.email;
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASEURL}/jwt`,
            { userInfo },
            { withCredentials: true }
          );
          console.log(data);
        } catch (error) {
          console.error('Error updating user data or fetching token:', error);

          try {
            // Logout on error
            const { data } = await axios.get(
              `${import.meta.env.VITE_BASEURL}/logout`,
              { withCredentials: true }
            );
            console.log('Logout Response:', data);
          } catch (logoutError) {
            console.error('Error during logout:', logoutError);
          }
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => keepUser();
  }, [auth]);

  const authInfo = {
    user,
    loading,
    createNewUser,
    sigin,
    logout,
    updateUserProfiles,
    googleLogin,
    gitHubLogin,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
