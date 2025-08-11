import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, isDarkTheme, setIsDarkTheme} = useContext(Context)

    const renderWithFormatting = (text) => {
        if (typeof text !== 'string' || text.length === 0) return text
        const chunks = text.split(/(\*\*.+?\*\*)/g)
        const elements = []
        chunks.forEach((chunk, chunkIndex) => {
            if (chunk.startsWith('**') && chunk.endsWith('**')) {
                elements.push(
                    <strong key={`b-${chunkIndex}`}>{chunk.slice(2, -2)}</strong>
                )
            } else {
                const splitOnAsterisk = chunk.split(/\*/g)
                splitOnAsterisk.forEach((segment, segIndex) => {
                    const lines = segment.split(/\r?\n/g)
                    lines.forEach((line, lineIndex) => {
                        if (line) {
                            elements.push(
                                <React.Fragment key={`t-${chunkIndex}-${segIndex}-${lineIndex}`}>
                                    {line}
                                </React.Fragment>
                            )
                        }
                        if (lineIndex < lines.length - 1) {
                            elements.push(
                                <br key={`nl-${chunkIndex}-${segIndex}-${lineIndex}`} />
                            )
                        }
                    })
                    if (segIndex < splitOnAsterisk.length - 1) {
                        elements.push(<br key={`ast-${chunkIndex}-${segIndex}`} />)
                    }
                })
            }
        })
        return elements
    }

  return (
    <div className={`main ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className="nav">
            <p> Gemini </p>
            <div className="nav-right">
                <button 
                    className="theme-toggle"
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                >
                    {isDarkTheme ? '☀️' : '🌙'}
                </button>
                <img src={assets.user_icon} alt="" />
            </div>
        </div>
        <div className="main-container">
            {!showResult
            ?<>
            <div className="greet">
                <p> <span>Hello, Omkar.</span></p>
                <p> How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest Some Beatiful places to visit In Bengaluru</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly Summarize the concept of Urban Planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team Bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p> {recentPrompt} </p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p>{renderWithFormatting(resultData)}</p>
                        }
                    </div>
                </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={e => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSent(input) }} value={input} type="text" placeholder='Enter a Prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                      {input?<img onClick={() => onSent(input)} src={assets.send_icon} alt="" />:null}  
                    </div>
                </div>
                <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses.Your privacy and Gemini Apps
                <br>
                </br>
                <p> Omkar Nerale @2025 </p>
            </p>
            </div>
        </div>
    </div>
  )
}

export default Main