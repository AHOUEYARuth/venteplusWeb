import ShopDetailHeader from '@/components/layout/ShopDetailHeader';
import ShopDetailNavBar from '@/components/layout/ShopDetailNavBar';
import ShopDetailProductSec from "@/components/layout/ShopDetailProductSection";
import React from 'react';

const shopDetails = () => {
    return (
      <div>
        {/* <ShopDetailNavBar /> */}
        <ShopDetailHeader />
        <ShopDetailProductSec />
      </div>
    );
};

export default shopDetails;