
import './HomeScreen.css'
import {useState} from 'react';
export default function HomeScreen() {
    const [userText,setUserText]=useState('');
    const [response,setResponse]=useState('');
    const [written,setWritten]=useState(0);
    const [predicted,setPredicted]=useState(0);
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
            setWritten(written+e.target.value.split(' ').length)
        console.log(e.target.value);
    }
  return (
    <article className="landing">
      <section className="title">
        <div className="titleText">Predly</div>
        <div className="Prediction Details">
          <div className="subtitleText">{written} Words Written</div>
          <div className="subtitleText">{predicted} Words predicted</div>
        </div>
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
        <div classname="answer-text">
          Made with ❤ by Rishabh, Hemanth and Saksham
        </div>
      </section>
    </article>
  );
}
