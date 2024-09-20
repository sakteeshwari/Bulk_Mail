


const inputbox = document.getElementById("input-file")
// console.log(inputbox)

inputbox.addEventListener("change", function (e) {

    // console.log(e.target.files[0])
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
        console.log(workbook)

        const sheetName=workbook.SheetNames[0];
        console.log(sheetName)
        const worksheet=workbook.Sheets[sheetName]
        console.log(worksheet)

        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        console.log(emailList)

    }

    reader.readAsBinaryString(file)


})

