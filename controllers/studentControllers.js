import Student from "../models/student.js"

export function getStudents(req,res){
    Student.find().then(
        (studentList)=>{[
            res.json({
                message : studentList
            })
        ]}
    )
}

export function createStudent(req,res){
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message : "Student Saved."
        })
    }).catch(()=>{
        res.json({
            message : "Student not saved."
        })
    })
}

export function deleteStudent(req,res){
    Student.deleteOne({name : req.body.name}).then(()=>{
        res.json({
            message : "Student deleted."
        })
    })
}