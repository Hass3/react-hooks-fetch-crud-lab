import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]) ;

  function handleAddQs(newQuestion){
    const updatedQuestions = [...questions, newQuestion]; // Post
    setQuestions(updatedQuestions);
  }

  function handleDeleteQ(deletedQ){
    const updatedQuestions = questions.filter(q => q.id !== deletedQ.id); // delete
    setQuestions(updatedQuestions);
  }

  function handleEdit(changedQ){
    const updatedQuestions = questions.map((q)=>{
      if(q.id === changedQ.id){
        return changedQ
      }                                             // patch
      else{ return q}
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQs={handleAddQs} /> : <QuestionList onEdit={handleEdit} onDel={handleDeleteQ} qs ={questions} setQs = {setQuestions} />}
    </main>
  );
}

export default App;
