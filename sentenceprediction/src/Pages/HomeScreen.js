
import './HomeScreen.css'
import {useState} from 'react';
export default function HomeScreen() {
    const [userText,setUserText]=useState('');
    const [response,setResponse]=useState('');
    const [written,setWritten]=useState(0);
    const [predicted,setPredicted]=useState(0);
    const countWords=(str)=>{
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        return str.split(' ').length;
    }
    const handleChange= async (e)=>{
        setUserText(e.target.value);
            if (/\s$/.test(e.target.value)) {
              const response = await fetch(
                `http://20.98.240.49:5000/predict/?text=${e.target.value}`
              );
              const data = await response.json();
              setResponse(data.prediction);
              setPredicted(predicted+data.words);
              console.log(data);
            }
            setWritten(countWords(e.target.value))
        console.log(e.target.value);
    }
  return (
    <article className="landing">
      <section className="title">
        <div className="titleText">Predly</div>
      </section>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"start", alignItems:"start", padding:"20px 0"}} className="Prediction Details">
          <div className="subtitleText">{written} Words Written</div>
          <div className="subtitleText">{predicted} Words Predicted</div>
        </div>
      <section className="questionSection">
        <textarea
          className="inputTextBox"
          type="textarea"
          name="textValue"
          value={userText}
          onChange={handleChange}
        />
      </section>
      <section class="answerSection">
        <div className="answerContainer">
          <span className="answer-text">{response}</span>
        </div>
      </section>
      <section class="footer">
        <div className="answer-text">
          Made with ❤ by Rishabh, Hemanth and Saksham
        </div>
      </section>
    </article>
  );
}
