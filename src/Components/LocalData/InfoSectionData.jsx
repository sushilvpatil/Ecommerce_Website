import React from "react";
import { FaShippingFast,FaHeadset,FaMoneyBillWave,FaLock,FaTag } from "react-icons/fa";
const InfoSectionData = [
    {
        icon: <FaShippingFast className="text-3x1 text-red-600"/>,
        title: 'Free Shipping',
        description: 'Get your orders deliverd with no extra cost',
    },
    {
        icon: <FaHeadset className="text-3x1 text-red-600"></FaHeadset>,
        title: '24/7 Support',
        description: 'We are here to assist you anytime'
    },
    {
        icon: <FaMoneyBillWave className="text-3x1 text-red-600"/>,
        title: '100% Money Back',
        description: 'Full refund if you are not satisfied'
    },
    {
        icon: <FaLock className="text-3x1 text-red-600"/>,
        title: 'Payment Secure',
        description: 'Payment info is safe with us'
    },
    {
        icon: <FaTag className="text-3x1 text-red-600"/>,
        title: 'Discount',
        description: 'Enjoy the best prose on our product'
    }
];

export default InfoSectionData;