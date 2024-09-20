import './App.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';


import axios from 'axios';

function App() {

  // textarea usestate
  const[textarea,setTextarea]=useState("")

  // send status change ustate
  const[sendstatus,setSendstatus]=useState(false)

  // choose file input box usestate
  const[file,setFile]=useState("")

  // 
  const[emailList,setEmailList]=useState([])

  const handleText=(e)=>{
    setTextarea(e.target.value)
  }
  console.log(textarea)

  const handleFile=(e)=>{
    const file = e.target.files[0]
    // console.log(file)

    const reader=new FileReader()
    // console.log(reader)

    reader.onload=function(event){

        // console.log(e.target.result)

        const data=event.target.result
        // console.log(data)
        
        // convert to readable format use cdn library
        const workbook=XLSX.read(data,{type:"binary"})
        // console.log(workbook)

        const sheetName=workbook.SheetNames[0];
        console.log(sheetName)
        const worksheet=workbook.Sheets[sheetName]
        // console.log(worksheet)

        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        const totalEmail=emailList.map(function(item){
          return item.A
          
        })
        console.log(totalEmail)
        setEmailList(totalEmail)
    }

    reader.readAsBinaryString(file)


  }

  const handleSend=()=>{

    setSendstatus(true)

    axios.post("http://localhost:4000/mail",{msg:textarea,emailList:emailList})
    .then(function(data){
      // console.log(data.data)
      if(data.data===true)
      {
        alert("send msg successfully")
        setSendstatus(false)
      }
      else
      {
        alert("msg failed")
      }
    })

  }

  return (
    <div>

      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-5">BulkMail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-5">We can help your business with sending multiple emails at once</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-4">Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
          <textarea className=" w-[80%] h-32 py-2 mt-4 outline-none px-2 border border-black rounded" value={textarea} onChange={handleText} placeholder="Enter the Email Text..."></textarea>
        <div>
          <input type="file" onChange={handleFile} value={file} className="border-4 border-dashed py-4 px-4 mt-5 mb-5" />
        </div>

        <p>Total Emails in the file: {emailList.length}</p>

        <button className="mt-2 bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit" onClick={handleSend}>{sendstatus?"Sending...":"Send"}</button>

      </div>

      <div className="bg-blue-300 text-white text-center p-8">

      </div>

      <div className="bg-blue-200 text-white text-center p-8">

      </div>

      <div className="bg-blue-100 text-white text-center p-8">

</div>

    </div>
  );
}

export default App;
