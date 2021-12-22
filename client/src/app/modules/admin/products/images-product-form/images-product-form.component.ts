import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Image } from 'src/app/services/model/product/image.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';

@Component({
  selector: 'app-images-product-form',
  templateUrl: './images-product-form.component.html',
  styleUrls: ['./images-product-form.component.css']
})
export class ImagesProductFormComponent implements OnInit {
  listImages: Image[] = []

  constructor(private productsStore: ProductsStoreService,
    @Inject(MAT_DIALOG_DATA) public idProduct: number) { 
    }

  ngOnInit() {
  }

  getImages(id) {
    this.productsStore.getImagesByIdProduct(id).subscribe(res => {
      this.listImages = res
    })
  }
}
