import { Helmet } from 'react-helmet';
import HappyFamilies from '../../../Components/HappyFamilies';
import PetsService from '../../../Components/PetsService';
import Banner from './Banner/Banner';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Animals | Home</title>
      </Helmet>
      <Banner />
      <PetsService />
      <HappyFamilies />
    </div>
  );
};

export default Home;
