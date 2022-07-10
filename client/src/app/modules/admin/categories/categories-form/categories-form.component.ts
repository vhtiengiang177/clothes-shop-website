import { CategoryService } from './../../../../services/data/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CategoryForm } from 'src/app/services/model/category/category-form.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  messageErrorImage: string = ""
  fileToUploadUpdate: File
  oldImageUrl: string= "assets/No_image_available.png"
  loading: boolean = false
  imageUrl: string = "assets/No_image_available.png"

  constructor(public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryForm,
    private categoriesStore: CategoriesStoreService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService) { 
      console.log(data);

      if (data.category.image != null){
        this.oldImageUrl = data.category.image;
        this.imageUrl = data.category.image;
      }
      
    }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
      if (this.data.typeform === 0) {
        this.categoriesStore.create(this.data.category).subscribe(res => {
          this.updateImage(res.id);
          this.dialogRef.close(res);
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.data.typeform === 1) {
        this.categoriesStore.update(this.data.category).subscribe(res => {
          if (this.oldImageUrl != this.imageUrl)
              this.updateImage(this.data.category.id)
          this.dialogRef.close(res)
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else this.toastr.warning("It looks like something went wrong")
    }
  }

  checkValidate() {
    if(!this.data.category.name) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }
  
  public uploadFile = (files) => {
    if (files.length === 0)
      return
    let fileToUpload = <File>files[0];
    if (fileToUpload.type != "image/jpeg" && fileToUpload.type != "image/png") {
      this.messageErrorImage = "Invalid image file format"
      return
    }
    this.messageErrorImage = ""
    this.readFile(fileToUpload)
    this.fileToUploadUpdate = fileToUpload
  }

  readFile(fileToUpload) {
    var reader  = new FileReader()
    reader.onload = (event: Event) => {
      this.imageUrl = reader.result.toString()
    }
    reader.readAsDataURL(fileToUpload);
  }

  deleteImage() {
    this.imageUrl = this.oldImageUrl
    // SEND API DELETE IMAGE
  }

  updateImage(idCategory) {
    console.log(this.fileToUploadUpdate);
    
    const formData = new FormData();
    formData.append('file', this.fileToUploadUpdate, this.fileToUploadUpdate.name);
    this.categoryService.addImageCategory(formData,idCategory).toPromise()
  }
}
