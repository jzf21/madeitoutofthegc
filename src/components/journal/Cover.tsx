import React from 'react'
import { BookOpen } from 'lucide-react'
import eiffel from '../../assets/eiffel-tower.svg'
import paperbackground from '../../assets/paperbackground.jpg'
import textbackground from '../../assets/textbackground.png'
import airplane from '../../assets/airplane.png'
import mapcutout from '../../assets/mapcutout.webp'
import mapcutout2 from '../../assets/mapcutout2.webp'
import twintowers from '../../assets/twintowers.png'
import casette from '../../assets/casette.webp'
type Props = {
    username: string
   
}

export const Cover = (props: Props) => {
  return (
    <>
     
      <div className="  relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className=" absolute inset-0 opacity-70 bg-gradient-to-br ">
            <img src={paperbackground} alt="Paper Background" className="w-full h-full object-cover" />
        </div>
        
        {/* Decorative Corner Elements */}
       
    {/* Decorative elements with responsive positioning */}
    <div className="absolute top-12 md:top-24 z-20 left-[10%] md:left-1/3 transform -translate-x-1/2">
        <img src={airplane} alt="Airplane" className="w-40 h-32 md:w-72 md:h-48" />
    </div>
    <div className="absolute -bottom-2 md:-bottom-32 z-20 -left-2 md:-left-5 transform -translate-x-1/2">
        <img src={mapcutout} alt="Map Cutout" className="w-64 md:w-auto" />
    </div>
    <div className="absolute -top-16 md:-top-32 z-10 -left-10 md:-left-20 transform rotate-[45deg]">
        <img src={mapcutout2} alt="Map Cutout" className="w-48 md:w-72" />
    </div>
    <div className="absolute -top-4 md:top-2 z-20 -right-16 md:right-0 transform rotate-[-15deg]"> 
        <img src={twintowers} alt="Twin Towers" className="w-48 md:w-72" />
    </div>
    <div className="absolute bottom-0 md:bottom-0 z-20 -right-20 md:-right-20 transform -translate-x-1/2">
        <img src={casette} alt="Cassette" className="w-48 h-32 md:w-72 md:h-48" />
    </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">

          {/* Travel Icons Circle */}
          <div className="relative w-96 h-96 mb-6">
            {/* Central Circle */}
            <div className="absolute inset-6   flex flex-col items-center justify-center ">
                 <div className=" absolute inset-[-1]  bg-gradient-to-br ">
            <img src={textbackground} alt="Paper Background" className="w-full h-full object-cover" />
        </div>
              <div className="relative md:z-10 text-center">
              
                <div  className="text-5xl font-bold text-[#d56738] leading-tight notable">TRAVEL</div>
                <div  className="text-5xl font-bold text-[#5c7883] leading-tight notable">JOURNAL</div>
            
              </div>
            </div>

            {/* Dotted Circle Path */}
        

            {/* Travel Icons Around Circle */}
            {/* Eiffel Tower */}
          

            {/* Airplane */}
            {/* <div className="absolute top-8 right-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
              </svg>
            </div> */}

            {/* Building */}
            {/* <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444">
                <path d="M6 2V22H18V2H6ZM8 4H16V20H8V4ZM10 6V8H14V6H10ZM10 10V12H14V10H10ZM10 14V16H14V14H10Z" />
              </svg>
            </div> */}

            {/* Camera */}
            {/* <div className="absolute bottom-8 right-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#8b5cf6">
                <path d="M4 4H7L9 2H15L17 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM12 7C9.24 7 7 9.24 7 12S9.24 17 12 17S17 14.76 17 12S14.76 7 12 7Z" />
              </svg>
            </div> */}

            {/* Compass */}
            {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <path d="M12 6L14 10L12 12L10 10L12 6Z" fill="#f59e0b" />
                <text x="12" y="8" textAnchor="middle" fontSize="6" fill="#f59e0b">
                  N
                </text>
              </svg>
            </div> */}

            {/* Suitcase */}
            {/* <div className="absolute bottom-8 left-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#06b6d4">
                <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7H19C20.1 7 21 7.9 21 9V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V9C3 7.9 3.9 7 5 7H8ZM10 5V7H14V5H10Z" />
              </svg>
            </div> */}

            {/* Mountain */}
            {/* <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981">
                <path d="M14 6L10.25 11L13.1 14.8L11.5 16C9.81 13.75 7 10 7 10L1 20H23L14 6Z" />
              </svg>
            </div> */}

            {/* Small Airplane on Path */}
            {/* <div className="absolute top-12 right-8">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" className="rotate-45">
                <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
              </svg>
            </div> */}
          </div>

          {/* Bottom Decorative Elements */}
          {/* <div className="flex items-center space-x-4 text-orange-600">
            <div className="w-8 h-0.5 bg-orange-400"></div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
            <div className="w-8 h-0.5 bg-orange-400"></div>
          </div> */}
        </div>

        {/* Corner Decorations */}
        {/* <div className="absolute bottom-4 left-4 text-orange-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 text-orange-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z" />
          </svg>
        </div> */}
      </div>
  
    </>
  )
}