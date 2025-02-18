import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../Pages/Shared/Home/Home';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';
import DeshBoard from '../DeshBoard/DeshBoard';
import Add_Pets from '../DeshBoard/Add_Pets';
import Profile from '../Components/Profile';
import MyPets from '../DeshBoard/MyPets';
import CreateCampaign from '../DeshBoard/CreateCampaign';
import Pet_Listing from '../Pages/Pet_Listing/Pet_Listing';
import PetDetails from '../Pages/Pet_Listing/PetDetails';
import PetsUpdate from '../Components/PetsUpdate';
import DonetCampaign from '../Pages/DonteCampaigns/DonetCampaign';
import MyDonation from '../DeshBoard/myDonation/MyDonation';
import PrivateRouter from './PrivateRouter';
import Donation from '../Pages/DonteCampaigns/Donation';
import DonationDeteils from '../Pages/DonteCampaigns/DonationDeteils';
import AdoptionRequest from '../DeshBoard/AdoptionRequest';
import Users from '../DeshBoard/all-user/Users';
import ManagePets from '../DeshBoard/ManagePets';
import AdminRoute from './AdminRoute';
import EditDonation from '../DeshBoard/myDonation/EditDonation';
import AllDonationTable from '../DeshBoard/myDonation/AllDonationTable';
import ErrorPage from '../Components/ErrorPage';
import Contact from '../Components/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pet-listing',
        element: <Pet_Listing />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/pet-details/:details',
        element: (
          <PrivateRouter>
            <PetDetails />
          </PrivateRouter>
        ),
      },
      {
        path: '/donation-campaigns',
        element: <DonetCampaign />,
      },
      {
        path: '/donation/:id',
        element: (
          <PrivateRouter>
            <DonationDeteils />
          </PrivateRouter>
        ),
      },

      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DeshBoard />
      </PrivateRouter>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/add-pet" replace />,
      },
      {
        path: '/dashboard/add-pet',
        element: <Add_Pets />,
      },
      {
        path: '/dashboard/my-added-pets',
        element: <MyPets />,
      },
      {
        path: '/dashboard/adoption-requests',
        element: <AdoptionRequest />,
      },
      {
        path: '/dashboard/create-donation',
        element: <CreateCampaign />,
      },
      {
        path: '/dashboard/pets_update/:id',
        element: <PetsUpdate />,
      },
      {
        path: '/dashboard/my-donation-campaigns',
        element: <MyDonation />,
      },
      {
        path: '/dashboard/my-donations',
        element: <Donation />,
      },

      {
        path: '/dashboard/my-donations/:my_donation',
        element: <EditDonation />,
      },
      {
        path: '/dashboard/users',
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/all-pets',
        element: (
          <AdminRoute>
            <ManagePets />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/all-donations',
        element: (
          <AdminRoute>
            <AllDonationTable />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
