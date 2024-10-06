import React, {useState} from "react";

function QuestionItem({ question, onDeleted, onPatch }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAnswer, setCorrectAnwer]= useState(correctIndex)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handelClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method : "DELETE"
    })
    .then(r=>r.json())
    .then(()=> onDeleted(question))
    
  }

  function handleChange(e){
    const newAnswer = parseInt(e.target.value);
    setCorrectAnwer(newAnswer);
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "PATCH", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({correctIndex: newAnswer})
    })
    .then(r=> r.json())
    .then(q=> onPatch(q))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctAnswer}>{options}</select>
      </label>
      <button onClick={handelClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
