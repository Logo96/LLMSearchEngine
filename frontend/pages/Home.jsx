import Query from '../components/query.jsx'
import Backdrop from "../components/backdrop.jsx"
import { useState } from 'react'
function Home({handleHomeChange, handleParameter_Change, currentInferenceRequest}) {
  const handlePrompt_Change = (e, isEnterKey) => {
    if (isEnterKey) {
        handleHomeChange();
    } else {
        console.log(e)
        currentInferenceRequest.query = e;
    } 
}
  return (
    <Backdrop>
        <Query setPrompt_Request={handlePrompt_Change} handleParameterChange={handleParameter_Change} currentInferenceRequest={currentInferenceRequest}>
        </Query>
    </Backdrop>
  )
}
export default Home