
import './HomeScreen.css'
import {useState} from 'react';
export default function HomeScreen() {
    const [userText,setUserText]=useState('');
    const [response,setResponse]=useState('');
    const handleChange= async (e)=>{
        await setUserText(e.target.value);
            if (/\s$/.test(e.target.value)) {
              const response = await fetch(
                `http://20.98.240.49:5000/predict/?text=${e.target.value}`
              );
              const data = await response.json();
              setResponse(data.prediction);
              console.log(data);
            }
        console.log(e.target.value);
    }
  return (
    <article className="landing">
      <section className="title">
        <div className="titleText">Predly</div>
      </section>
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
        <div classname="answer-text">Made with ❤ by Rishabh, Hemanth and Saksham</div>
      </section>
    </article>
  );
}
