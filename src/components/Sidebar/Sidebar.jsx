import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
const Sidebar = () => {
  const { prevPrompts, onSent, setRecentPrompt, isDarkTheme } = useContext(Context)
  const[extended,setExtended]=useState(false)
  
  
  
  
    return (

    <div className={`sidebar ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt='' />
            <div className="new-chat">
                <img src={assets.plus_icon} alt='' />
              {extended?<p> New Chat</p>:null} 
            </div>
            {extended? <div className="recent">
                <p className="recent-title"> Recent </p>
                {prevPrompts.length === 0 ? (
                  <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>No recent prompts</p>
                  </div>
                ) : (
                  prevPrompts.map((prompt, index) => (
                    <div
                      key={`${prompt}-${index}`}
                      className="recent-entry"
                      onClick={() => { setRecentPrompt(prompt); onSent(prompt); }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={assets.message_icon} alt="" />
                      <p>{prompt.length > 28 ? `${prompt.slice(0, 28)}...` : prompt}</p>
                    </div>
                  ))
                )}
            </div>
            :null
        }
           
        </div>
        <div className="bottom">
            <div className="bottom-item  recent-entry">
                <img src={assets.question_icon} alt="" />
              {extended?<p> Help </p>:null}  
            </div>
            <div className="bottom-item  recent-entry">
                <img src={assets.history_icon} alt="" />
               {extended?<p> Activity </p>:null} 
            </div>
            <div className="bottom-item  recent-entry">
                <img src={assets.setting_icon} alt="" />
              {extended?<p> Settings </p>:null}  
            </div>
        </div>
    </div>
  )
}

export default Sidebar