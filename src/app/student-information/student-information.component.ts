import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Subscriber } from 'rxjs';
import{ ApiService} from "../shared/api.service";
import { studentModel } from './student-information.model';
declare var $: any; 
@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {
  tablestatus:boolean=false;
  formvalue !: FormGroup;
  studentModelObj : studentModel = new studentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api :ApiService) { }
  ngOnInit(): void {
   this.formvalue = this.formbuilder.group({
   student_Id : [''],
   student_Name : [''],
   student_Date_Of_Birth : [''],
   student_Department : [''],
   student_joining_Year : [''],
   student_Contact_Number : ['']
   })
   this.getAllstudent();
  }
 clickAddStudent(){
   this.formvalue.reset();
   this.showAdd = true;
   this.showUpdate = false;
 }
  postStudentDetails(){
    this.studentModelObj.student_Id = this.formvalue.value.student_Id;
    this.studentModelObj.student_Name = this.formvalue.value.student_Name;
    this.studentModelObj.student_Date_Of_Birth = this.formvalue.value.student_Date_Of_Birth;
    this.studentModelObj.student_Department = this.formvalue.value.student_Department;
    this.studentModelObj.student_joining_Year = this.formvalue.value.student_joining_Year;
    this.studentModelObj.student_Contact_Number = this.formvalue.value.student_Contact_Number;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Student information added successfully")
      $("#").modal("hide");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getAllstudent();
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }
  getAllstudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;
    })
  }
  deleteStudent(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Student information deleted")
      this.getAllstudent()
    })
  }
  onEdit(row: any){
    this.showAdd = false;
   this.showUpdate = true;
    this.studentModelObj.student_Id = row.id;
    this.formvalue.controls['student_Name'].setValue(row.student_Name)
    this.formvalue.controls['student_Date_Of_Birth'].setValue(row.student_Date_Of_Birth)
    this.formvalue.controls['student_Department'].setValue(row.student_Department)
    this.formvalue.controls['student_joining_Year'].setValue(row.student_joining_Year)
    this.formvalue.controls['student_Contact_Number'].setValue(row.student_Contact_Number)
  }
  updateStudentDetails(){
    this.studentModelObj.student_Name = this.formvalue.value.student_Name;
    this.studentModelObj.student_Date_Of_Birth = this.formvalue.value.student_Date_Of_Birth;
    this.studentModelObj.student_Department = this.formvalue.value.student_Department;
    this.studentModelObj.student_joining_Year = this.formvalue.value.student_joining_Year;
    this.studentModelObj.student_Contact_Number = this.formvalue.value.student_Contact_Number;
    this.api.updateStudent(this.studentModelObj,this.studentModelObj.student_Id)
    .subscribe(res=>{
      alert("Updated student details");
      $("#").modal("hide");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getAllstudent();
    })
  }
 }


