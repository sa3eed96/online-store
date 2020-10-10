import React, {useContext} from 'react';
import DiscountBanner from './discountbanner/discountbanner';
import Navigation from './navigation/navigation';

const Header = (props) => {
    return (
        <div>
            <DiscountBanner />
            <Navigation />
        </div>
    );
}
export default Header;