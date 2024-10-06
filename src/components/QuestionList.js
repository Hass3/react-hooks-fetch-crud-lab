import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({qs, setQs, onDel, onEdit}) {

  useEffect(()=>{
     let isMounted = true
    fetch("http://localhost:4000/questions")
     .then(r=>r.json())
     .then(questions => {
      if(isMounted === true){
        setQs(questions)
      }
     })

     return function cleanUp(){
      isMounted = false
     }

  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qs.map((q)=> <QuestionItem key={q.prompt} question={q} onDeleted={onDel} onPatch ={onEdit} />)}</ul>
    </section>
  );
}

export default QuestionList;
