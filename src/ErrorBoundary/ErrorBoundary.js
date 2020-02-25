import React, {Component} from 'react';

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    static getDerivedStateFromError(error){
        return{
            hasError: true,
        }
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error,
            errorInfo
        });
        console.log('error', error.message)
        console.log('errorInfo', errorInfo)
} 

    render(){
        if(this.state.hasError){
            return(
            <div className="errorContainer">
                <div className="errorContent">
                <a href="" onClick={() => window.location.reload}><i className="fa fa-2x fa-redo"></i></a>
                <p>An Error has occured while loading data.</p>
                <p>Please refresh your page or Check your Internet Connection.</p>
                </div>
               
            </div>
            )
        }else{
            return this.props.children
        }
    }
}