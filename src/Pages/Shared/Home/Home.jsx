import { Helmet } from 'react-helmet';
import HappyFamilies from '../../../Components/HappyFamilies';
import PetsService from '../../../Components/PetsService';
import Banner from './Banner/Banner';
import ParallaxImage from '../../../Components/ParallaxImage';
import CustomersReviews from '../../../Components/CustomersReviews';
import LIsting from '../../Pet_Listing/LIsting';
import Featured from '../../../Components/Featured';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Animals | Home</title>
      </Helmet>
      <Banner />
      <LIsting />
      <Featured />
      <PetsService />
      <HappyFamilies />
      <ParallaxImage />
      <CustomersReviews />
    </div>
  );
};

export default Home;
