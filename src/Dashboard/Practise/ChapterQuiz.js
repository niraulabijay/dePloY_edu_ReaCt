import React, {useState, useEffect} from "react";
import {useHistory, useRouteMatch} from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import Skeleton from "react-loading-skeleton";
import QuotaFull from "./QuotaFull";


const ChapterQuiz = (props) => {
    const {params} = useRouteMatch();
    console.log('Parameter',params)
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [question, setQuestionResponse] = useState();
    const [active, setActive] = useState();
    const [result, setResult] = useState(null);
    const [EnableSubmit, setEnableSubmit] = useState(false)
    const [NextButton, setNextButton] = useState(false)
    const [nextQuestion, setNextQuestion] = useState(false)
    const [correct, setCorrect] = useState()
    const [mistake, setMistake] = useState()
    const [quota, setQuota] = useState(false)
    const {Authtoken} = useAuth();
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://noname.dotnep.com/api/practise_by_chapter/'+(params.chapterId),
            headers: {Authorization : "Bearer"+ Authtoken.token},
            timeout: 10000
        }).then(
            response => {
                console.log(response)
                console.log(response.status)
                setResult(null);
                if(response.status === 200){
                setQuestionResponse(response.data.data)
                }
                if(response.data.status === "error"){
                    setQuota(true)
                }
                setLoading(true);
            }
        )
    }, [nextQuestion])
    const handleChange = (answer_id) => {
        console.log(answer_id)
        setActive(answer_id)
        setEnableSubmit(true)
    }

    const handleSubmit = () =>{
        const selected_answer = question.answers.filter(ans=>{
            return ans.id === active
        })[0];
        setActive()
        if(selected_answer){
            if(parseInt(selected_answer.correct) === 1){
                setResult(true)
                setActive(selected_answer.id)
                setCorrect(1)
            } 
            else {
                setResult(false)
                setMistake(selected_answer.id)
                question.answers.filter(select => {
                    if(parseInt(select.correct) === 1 ){
                        setActive(select.id)
                    }
                })
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
        setActive()
        setMistake()
        setResult()
        setQuestionResponse()

        if(nextQuestion){
            setNextQuestion(false)
        }else{
            setNextQuestion(true)
        }
        setNextButton(false)
        setLoading(false);
        axios({
            method: 'post',
            url: 'https://noname.dotnep.com/api/practise/store',
            headers: {Authorization : "Bearer"+ Authtoken.token},
            data: { "data": [
            {
                question_id: question.id,
                correct: correct,
                
            }],
            chapter_id: question.chapter_id
        }
        }).then(
            res =>{
                console.log('res',res)
            }
        )
    }

    const handleQuit = e => {
        e.preventDefault()
        history.replace({
            pathname: '/learn'
        })
    }
    
    return (
        <React.Fragment>        
            <div className="quiz">
                <div className="quit-section">
                    <div className="quit">
                        <a href="" onClick data-toggle="modal" data-target="#quitModal"> <i className="fa fa-stop-circle"></i> Quit</a>
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
            <a href="" onClick={handleQuit} data-dismiss="modal" className="yes">Yes</a> 
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
                </div>{
                    quota ? <QuotaFull /> :
                <>
                { loading ? (
                <>
                <div className="container test-section">
                    <div className="question-wrapper">
                    <div className="question-container">

                        <div className="question-title">
                            <span className="question-number">{question.id}.</span>
                            <span
											dangerouslySetInnerHTML={{ __html: question.name }}
										></span>
                        </div>
                        {/* use image of size 600*300 */}
                        {(question.image !=null) &&
                        <div className="question-image">
                            <img src={question.image} alt="" className="img-fluid" />
                        </div>
                    }
                    </div>
                    <div className="answer-container">
                        <div className="row">
                            {question.answers.map((answer, index)=>
                            <div className="col-md-6 col-sm-6">
                                <div className={"answer-wrapper"+' '+ ((answer.id === active) ? 'active' : '')  
                                +' '+ (mistake ? (answer.id === mistake ? 'wrong' : ''): '')}
                                
                                onClick ={ (!NextButton) ? () => handleChange(answer.id) : ''} >

                                    <div className="option-number">
                                        {index+1}

                               
                                    </div>
                                    <div
														className="option"
														dangerouslySetInnerHTML={{ __html: answer.name }}
													></div>
                                    <div className="option-tick">
                                        <i className="fa fa-check"></i>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
                </>
                ) : 
                 
                (
                    <>
                        <div className="container test-section">
                            <div className="question-container">
                                <div className="question-title">
                                    <span className="question-number">
                                        <Skeleton></Skeleton>
                                    </span>
                                </div>
                            </div>
                            <div className="answer-container">
                                    <div className="row">
                                        { [1,2,3,4].map((val,index) => { return(
                                        <div className="col-md-6 col-sm-6">
                                            <div
                                                className=
                                                    "answer-wrapper"
                                            >
                                                <div className="option-number">{val}</div>
                                                <div className="option">
                                                    <Skeleton></Skeleton>
                                                </div>
                                                <div className="option-tick">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        );})}
                                    </div>
                            </div>
                        </div>
                        
                    </>
                )
                }
                </>
                }
            </div>
            <div className="container">
            <button  className="chapterSubmit" onClick={handleSubmit} disabled={EnableSubmit ? '' : 'true'}>Submit</button>          
           
            {
                NextButton && <button className="chapterNext" onClick={handleNextQuestion}> Next!</button>
            }
             {     (result === true) ?
                <div className="status alert alert-success">Correct Answer</div>
                : (result === false) ?
                <div className="status alert alert-danger">Wrong Answer</div>
                : ""
            }
            </div>
                
    </React.Fragment>
    );

}

export default ChapterQuiz;