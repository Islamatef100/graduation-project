import React from 'react'
import './Style.css'
import { GiCctvCamera } from 'react-icons/gi';
import {FaCarSide} from "react-icons/fa"
export default function Animation() {
  return (
    <div className='AnimationStyle'>
      <div className='iconAnimation'>
        <FaCarSide fontSize='8rem' color='teal' className='NewAnimation' />
      </div>
        <GiCctvCamera fontSize='2rem'   className='camira' />
        </div>
  )
}
