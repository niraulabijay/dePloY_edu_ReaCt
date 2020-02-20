import React, {useState, useEffect} from "react";
import {useHistory, useRouteMatch} from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../Context/Auth";


const ChapterQuiz = (props) => {
    const {params} = useRouteMatch();
    console.log('Parameter',params)
    let history = useHistory();
    const [question, setQuestionResponse] = useState();
    const [active, setActive] = useState();
    const [result, setResult] = useState(null);
    const [EnableSubmit, setEnableSubmit] = useState(false)
    const [NextButton, setNextButton] = useState(false)
    const [nextQuestion, setNextQuestion] = useState(false)
    const [correct, setCorrect] = useState(0)
    const {Authtoken} = useAuth();
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://noname.hellonep.com/api/practise_by_chapter/'+(params.chapterId),
            headers: {Authorization : "Bearer"+ Authtoken.token}
        }).then(
            response => {
                console.log(response)
                console.log(response.status)
                setResult(null);
                if(response.status === 200){
                setQuestionResponse(response.data.data)
                }
            }
        )
    }, [nextQuestion])

    const handleChange = (answer_id) => {
        setActive(answer_id)
        setEnableSubmit(true)
    }

    const handleSubmit = () =>{
        console.log('abcd')
        const selected_answer = question.answers.filter(ans=>{
            return ans.id === active
        })[0];
        console.log(selected_answer)
        if(selected_answer){
            if(parseInt(selected_answer.correct) === 1){
                setResult(true)
                setCorrect(1)
            } 
            else {
                setResult(false)
                setCorrect(0)
            }
        }
        else{
            setResult(null)
            setCorrect(null)
        }
        setEnableSubmit(false)
        setNextButton(true)
         
    }
    const handleNextQuestion = () =>{
        if(nextQuestion){
            setNextQuestion(false)
        }else{
            setNextQuestion(true)
        }
        setNextButton(false)
        axios({
            method: 'post',
            url: 'http://noname.hellonep.com/api/practise/store',
            headers: {Authorization : "Bearer"+ Authtoken.token},
            data: { "data": [{
                question_id: question.id,
                correct: correct
            }]
        }
        }).then(
            res =>{
                console.log('res',res)
            }
        )
    }
    
    return (
        <React.Fragment>        
            <div className="quiz">
                <div className="quit-section">
                    <div className="quit">
                        <a href="" data-toggle="modal" data-target="#quitModal"> <i className="fa fa-stop-circle"></i> Quit</a>
                    </div>
                </div>
                <div className="modal" id="quitModal">
  <div className="modal-dialog">
    <div className="modal-content">

     
      <div className="modal-body">
      <button type="button" className="close" data-dismiss="modal">&times;</button>
        <div className="title">
            Really, wanna quit it?
        </div>
        <div className="button-container">
            <a href="" onClick={history.goBack} data-dismiss="modal" className="yes">Yes</a> 
            <a href="" className="no" data-dismiss="modal" >No </a>
        </div>    
      </div>   
    </div>
  </div>
</div>
                <div className="quiz-header">
                    <nav className="navbar navbar-expand-sm" style={{
                        background: "linear-gradient(45deg, #0be788, #09d6af)",
                        boxShadow: "0px 2px 4px #a1a4a4"
                    }}>                    
                    </nav>
                </div>
                {question ? (
                <>
                <div className="container test-section">
                    <div className="question-container">

                        <div className="question-title">
                            <span className="question-number">{question.id}.</span>
                            {question.name}
                        </div>
                    </div>
                    <div className="answer-container">
                        <div className="row">
                            {question.answers.map((answer, index)=>
                            <div className="col-md-6 col-sm-6">
                                <div className={"answer-wrapper" +' '+ ((answer.id === active) ? 'active' : '')}
                                
                                onClick ={ (!NextButton) ? () => handleChange(answer.id) : ''} >

                                    <div className="option-number">
                                        {index+1}

                               
                                    </div>
                                    <div className="option" >
                                        {answer.name}
                                    </div>
                                    <div className="option-tick">
                                        <i className="fa fa-check"></i>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>

                </div>
                </>
                ) : 
                 
                    <span>Loading</span>
                }
            </div>
            <div className="container">
            <button  className="chapterSubmit" onClick={handleSubmit} disabled={EnableSubmit ? '' : 'true'}>Submit</button>          
            {     (result === true) ?
                <div className="status alert alert-success">Correct Answer</div>
                : (result === false) ?
                <div className="status alert alert-danger">Wrong Answer</div>
                : ""
            }
            {
                NextButton && <button className="chapterNext" onClick={handleNextQuestion}> Next!</button>
            }
            </div>
                
            
    </React.Fragment>
    );

}

export default ChapterQuiz;