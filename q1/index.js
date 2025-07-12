const express=require("express");
const cors=require("cors");
const app=express();
const port=2000;

app.use(cors());
app.use(express.json());

let students=[];

function calculateGrade(marks){
    if(marks>=90) return 'A';
    else if (marks >= 80) return 'B';
    else if (marks >= 70) return 'C';
    else if (marks >= 60) return 'D';
    else return 'F';
}

app.get('/students',(req,res)=>{
    res.json(students);
});

app.post('/students',(req,res)=>{
    const { name,marks }=req.body;
    if(!name || marks===undefined){
        return res.status(400).json({message:"name and marks are required"});
    }
    const grade=calculateGrade(marks);
    const newStudent={id:Date.now(),name,marks,grade};
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const student=students.find(s=>s.id===id);
    if(!student) return res.status(404).json({message:"Student not found"});
    const {name,marks}=req.body;
    if(name) student.name=name;
    if(marks!== undefined){
        student.marks=marks;
        student.grade=calculateGrade(marks);
    }
    res.json(student);
});
app.delete('/students/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    students=students.filter(s=>s.id !== id);
    res.json({message:"Deleted"});
});
app.listen(port,()=>{
    console.log("Server running on port 2000");
});