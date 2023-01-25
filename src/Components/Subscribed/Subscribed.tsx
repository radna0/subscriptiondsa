import { ISubscribed } from '@/Resources/Typescript/Request'
import React from 'react'

const Subscribed: React.FC<ISubscribed> = ({ mainTxt, subTxt }) => {
  return (
    <div className=" max-w-full ">
      <h1 className="md:text-5xl text-4xl">{mainTxt}</h1>
      <p className=" mt-3">{subTxt}</p>
    </div>
  )
}

export default Subscribed
