import React from 'react';
import Banner from '../Banner/Banner';
import CarShowcase from '../CarShowcase/CarShowcase';
import CarsSoldGraph from '../CarsSoldGraph/CarsSoldGraph';
import LatestModifiedCars from '../LatestModifiedCars/LatestModifiedCars';

const Home = () => {
  return (
    <div>
      {/* <Title title="Home" /> */}
      <div>
        <Banner />
        <CarShowcase />
        <LatestModifiedCars />
        <CarsSoldGraph />
      </div>
    </div>
  );
};

export default Home;
