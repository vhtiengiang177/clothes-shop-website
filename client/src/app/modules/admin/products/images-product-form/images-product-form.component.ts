import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Image } from 'src/app/services/model/product/image.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';

@Component({
  selector: 'app-images-product-form',
  templateUrl: './images-product-form.component.html',
  styleUrls: ['./images-product-form.component.css']
})
export class ImagesProductFormComponent implements OnInit {
  listImages = new BehaviorSubject<Image[]>([])
  messageErrorImage: string = ""
  fileToUploadUpdate: File[] = []
  loading: boolean = false

  constructor(private productsStore: ProductsStoreService,
    @Inject(MAT_DIALOG_DATA) public idProduct: number,
    public dialogRef: MatDialogRef<ImagesProductFormComponent>,
    private toastr: ToastrService) { 
      this.getImages()
  }

  ngOnInit() {
  }

  getImages() {
    this.productsStore.getImagesByIdProduct(this.idProduct).subscribe(res => {
      if (res) {
        this.listImages.next(res)
        console.log(res);
        
      }
    })
  }

  public uploadFile = (files: File[]) => {
    if (files.length === 0)
      return
    let listFile = files
    Array.from(listFile).forEach(item => {
      let fileToUpload = item
      if (fileToUpload.type != "image/jpeg" && fileToUpload.type != "image/png") {
        this.messageErrorImage = "Invalid image file format"
        return
      }
      this.messageErrorImage = ""
      this.readFile(fileToUpload)
      this.fileToUploadUpdate.push(fileToUpload)
    })
  }

  readFile(fileToUpload) {
    var reader  = new FileReader()
    reader.onload = (event: Event) => {
      var image: Image = {
        id: 0,
        url: reader.result.toString(),
        name: fileToUpload.name
      }
      this.listImages.next(this.listImages.getValue().concat(image))
    }
    reader.readAsDataURL(fileToUpload);
    
  }

  save() {
    this.loading = true
    const formData = new FormData();
    Array.from(this.fileToUploadUpdate).map((file, index) => {
      formData.set('file', file, file.name);
      this.productsStore.addImageProduct(this.idProduct, formData).toPromise()
      this.loading = false
    });
    
    this.toastr.success("Upload successfully")
  }

  deleteImage(index) {
    var item = this.listImages.getValue()[index]
    console.log("file to upload array");
    console.log(this.fileToUploadUpdate);
    
    
    if (item.id != 0) {
      this.productsStore.deleteImageProduct(item.id).toPromise()
    }
    else {
      console.log(item.name);
      this.fileToUploadUpdate = this.fileToUploadUpdate.filter(file => file.name !== item.name)
    }
    
    console.log(this.fileToUploadUpdate);
    this.listImages.getValue().splice(index, 1)
  }
}
