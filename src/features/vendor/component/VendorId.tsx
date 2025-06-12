import React from 'react'
import VendorHeader from './VendorHeader';
import VendorInfoBar from './VendorInfoBar';

const VendorId = () => {
  return (
    <div>
      <div className="mb-4">
        <VendorHeader />
      </div>
      <div className="mb-4 w-full">
        <VendorInfoBar />
      </div>
    </div>
  );
}

export default VendorId