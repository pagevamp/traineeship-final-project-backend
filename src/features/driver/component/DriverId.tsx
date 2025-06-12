import React from 'react'
import DriverHeader from './DriverHeader';
import DriverInfoBar from './DriverInfoBar';

const DriverId = () => {
  return (
    <div>
      <div className="mb-4">
        <DriverHeader />
      </div>
      <div className="mb-4 w-full">
        <DriverInfoBar />
      </div>
    </div>
  );
}

export default DriverId