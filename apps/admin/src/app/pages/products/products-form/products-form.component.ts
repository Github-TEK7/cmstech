import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
      namep1: [''],
      iconp1: [''],
      descriptionp1: [''],
      namep2: [''],
      iconp2: [''],
      descriptionp2: [''],
      namep3: [''],
      iconp3: [''],
      descriptionp3: [''],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: `Producto ${product.name} fue creado!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Producto no fue creado!'
        });
      }
    );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Producto fue actualizado!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Producto no fue actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category!.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image!;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
          this.productForm.namep1.setValue(product.namep1);
          this.productForm.iconp1.setValue(product.iconp1);
          this.productForm.descriptionp1.setValue(product.descriptionp1);
          this.productForm.namep2.setValue(product.namep2);
          this.productForm.iconp2.setValue(product.iconp2);
          this.productForm.descriptionp2.setValue(product.descriptionp2);
          this.productForm.namep3.setValue(product.namep3);
          this.productForm.iconp3.setValue(product.iconp3);
          this.productForm.descriptionp3.setValue(product.descriptionp3);
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  onCancle() {
    this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')!.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result!;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }



  // private _getCartDetails() {
  //   this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
  //     this.cartItemsDetailed = [];
  //     this.cartCount = respCart?.items.length ?? 0;
  //     respCart.items.forEach((cartItem) => {
  //       this.ordersService.getProduct(cartItem.productId!).subscribe((respProduct) => {
  //         this.cartItemsDetailed.push({
  //           product: respProduct,
  //           quantity: cartItem.quantity
  //         });
  //       });
  //     });
  //   });
  // }
}
