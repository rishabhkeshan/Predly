
import './HomeScreen.css'
export default function HomeScreen() {
    const handleChange=(e)=>{
        console.log(e.target.value);
    }
  return (
    <article className="landing">
      <section className="title">
        <div className="titleText">Predly</div>
      </section>
      <section className="questionSection">
        <textarea className="inputTextBox" type="textarea" 
          name="textValue"
          onChange={handleChange}
        />
      </section>
      <section class="answerSection">
        <div className="answerContainer">
            <span className="answer-text"></span>
        </div>
      </section>
    </article>
  );
}
