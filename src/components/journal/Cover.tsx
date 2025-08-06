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
     
      <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className=" absolute inset-0 opacity-70 bg-gradient-to-br ">
            <img src={paperbackground} alt="Paper Background" className="w-full h-full object-cover" />
        </div>
        
        {/* Decorative Corner Elements */}
       
    {/* Decorative elements with responsive positioning */}
    <div className="absolute top-12 md:top-24 z-20 left-64 rotate-12 md:left-1/3 transform -translate-x-1/2">
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
          </div>
        </div>
      </div>
  
    </>
  )
}