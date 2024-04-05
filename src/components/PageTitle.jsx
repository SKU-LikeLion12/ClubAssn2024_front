import React from 'react';

const PageTitle = ({title, title2, subTitle, Tcolor, Tcolor2}) => {
  return (
    <div className={`titleFont pt-24 p-5 text-center mx-auto`}>
      <div className='text-6xl' style={{color: Tcolor}}>{title}</div>
      <div className='text-6xl mt-2' style={{color: Tcolor2}}>{title2}</div>
      <div className='text-3xl mt-2' style={{color: Tcolor}}>{subTitle}</div>
    </div>
  );
};

export default PageTitle;