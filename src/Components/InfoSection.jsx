import React from 'react';
import InfoSectionData from './LocalData/InfoSectionData';

const InfoSection = () => {
    return (
        <div className='bg-white pb-8 pt-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {InfoSectionData.map((data, index) => (
                    <div key={index} className='flex flex-col items-center text-center p-4 border rounded-lg shadow transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
                        {data.icon}
                        <h3 className='mt-4 text-xl font-semibold'>{data.title}</h3>
                        <p className='mt-2 text-gray-600'>{data.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfoSection;