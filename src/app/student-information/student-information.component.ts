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
    studentId : [''],
    studentName : [''],
    studentDateOfBirth : [''],
    studentDepartment : [''],
    studentJoiningYear : [''],
    studentContactNumber : ['']
   })
   this.getAllstudent();
  }
 clickAddStudent(){
   this.formvalue.reset();
   this.showAdd = true;
   this.showUpdate = false;
 }
  postStudentDetails(){
    this.studentModelObj.studentId = this.formvalue.value.studentId;
    this.studentModelObj.studentName = this.formvalue.value.student_Name;
    this.studentModelObj.studentDateOfBirth = this.formvalue.value.student_Date_Of_Birth;
    this.studentModelObj.studentDepartment = this.formvalue.value.student_Department;
    this.studentModelObj.studentJoiningYear = this.formvalue.value.student_joining_Year;
    this.studentModelObj.studentContactNumber = this.formvalue.value.student_Contact_Number;


    

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
    this.studentModelObj.studentId = row.id;
    this.formvalue.controls['studentName'].setValue(row.studentName)
    this.formvalue.controls['studentDateOfBirth'].setValue(row.studentDateOfBirth)
    this.formvalue.controls['studentDepartment'].setValue(row.studentDepartment)
    this.formvalue.controls['studentJoiningYear'].setValue(row.studentJoiningYear)
    this.formvalue.controls['studentContactNumber'].setValue(row.studentContactNumber)
  }
  updateStudentDetails(){
    this.studentModelObj.studentName = this.formvalue.value.studentName;
    this.studentModelObj.studentDateOfBirth = this.formvalue.value.studentDateOfBirth;
    this.studentModelObj.studentDepartment = this.formvalue.value.studentDepartment;
    this.studentModelObj.studentJoiningYear = this.formvalue.value.studentJoiningYear;
    this.studentModelObj.studentContactNumber = this.formvalue.value.studentContactNumber;
    this.api.updateStudent(this.studentModelObj,this.studentModelObj.studentId)
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


