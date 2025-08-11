import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider =(props) => {

    const [input,setInput]= useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] =useState([]);
    const [showResult,setShowResult] =useState(false);
    const [loading,setLoading]= useState(false);
    const [resultData,setResultData]=useState("");
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    

    const onSent = async (prompt) => {
        const userPrompt = typeof prompt === 'string' && prompt.trim().length > 0 ? prompt : input;
        if (!userPrompt || userPrompt.trim().length === 0) return;

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(userPrompt);
        setPrevPrompts((previous) => {
            const withoutDuplicate = previous.filter((p) => p !== userPrompt);
            const updated = [userPrompt, ...withoutDuplicate];
            return updated.slice(0, 20);
        });

        try {
            const response = await runChat(userPrompt);
            setResultData(response);
        } catch (error) {
            console.error("runChat failed:", error);
            setResultData("<i>Sorry, something went wrong. Please try again.</i>");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue ={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        isDarkTheme,
        setIsDarkTheme
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
