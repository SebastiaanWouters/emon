import React from 'react'
import { useWindowDimensions } from '../utils/utils'
import { Navigate } from 'react-router-dom';
export const MobileScreen = () => {
  const {width, height} = useWindowDimensions();
  return (
    <>
    <div className='mobileContainer'>
        <div className="card w-60 md:w-96 bg-neutral shadow-lg text-neutral-content">
        <div className="card-body bg-transparent items-center text-center">
            <div className="alert mt-1 bg-transparent">
            <div className='flex flex-col py-1 bg-transparent'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>We are only available on desktop right now.</span>
            </div>
            </div>
        </div>
        </div>
    </div>
    {width >= 959 && <Navigate to="/" replace={true} />}
    </>
  )
}
