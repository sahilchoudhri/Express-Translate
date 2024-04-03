import React ,{useEffect , useState , useRef} from 'react';
import languages from '../languages';


function Translator() {

    const[fromText , setFromText] = React.useState('');
    const[toText , setToText] = React.useState('');
    const[fromLanguage , setFromLanguage] = React.useState('en-GB');
    const[toLanguage , setToLanguage] = React.useState('hi-IN');
    const[loading , setLoading] = React.useState(false);
    


    const handleExchange = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLanguage = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLanguage);
    }


    const copyContent = (text) => {
        navigator.clipboard.writeText(text);

    }

    const speak = (text, language) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
       

     }

    const handleIconClick = (target, id) => {
    
    if(target.classList.contains('fa-copy'))
        if(id === 'from') {
            copyContent(fromText);
        }
        else{
            copyContent(toText);
        }

    else{
        if(id === 'from') {
            speak(fromText, fromLanguage);
        }
        else{
            speak(toText, toLanguage);
        }
    }   

}

    const handleTranslate = async () => {
        setLoading(true);
      try{
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
        let response = await fetch(url);
        let data = await response.json();
        setToText(data.responseData.translatedText);
    }
    catch(error){
        console.log(error);
    }
    setLoading(false);
}
  return (
    <>

    <div className='wrapper'>

    <div className='text-input'>
        <textarea className='from-text' id='from' placeholder='Enter text to translate' value={fromText} onChange={(event)=>setFromText(event.target.value)}></textarea>
        <textarea className='to-text' id='to' placeholder='Translation' readOnly value={toText} ></textarea>
    </div>

    <ul className='controls'>

    <li className='row from'>
        <div className='icons'>
        <i id="from" class= "fa-solid fa-volume-high" onClick={(event) => handleIconClick(event.target, 'from')}></i>
        <i id="from" class="fa-solid fa-copy" onClick={(event) => handleIconClick(event.target, 'from')}></i>
        </div>

        <select value={fromLanguage } onChange={(event)=>setFromLanguage(event.target.value)}>
        {
            Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}> {name}</option>
            ))
        }
        </select>
    </li>
 

    <li className='exchange' onClick={handleExchange}>
    <i class="fa-solid fa-arrow-right-arrow-left"></i>
    </li>   

    <li className='row to'>

    <select value={toLanguage} onChange={(event)=>setToLanguage(event.target.value)}  >
         {
            Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}> {name}</option>
            ))
        }
    </select>
    
    <div className='icons'>
       <i id="to" class="fa-solid fa-copy" onClick={(event) => handleIconClick(event.target, 'to')}></i>    
       <i id="to" class= "fa-solid fa-volume-high"  onClick={(event) => handleIconClick(event.target, 'to')}></i>
    
     </div>

    </li>
  
    </ul>
    </div>    

    <button onClick={handleTranslate}>
     {
        loading ? 'Translating...' : 'Translate Text' 
     }
    </button>
    </>
  )
}

export default Translator