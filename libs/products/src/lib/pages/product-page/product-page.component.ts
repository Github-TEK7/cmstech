import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@frontend/orders';
import { CategoriesService } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product?: Product;
  endSubs$: Subject<any> = new Subject();
  quantity!: 0;
  editmode = true;
  form!: FormGroup;
  isSubmitted = false;
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;
  isDonationmax!: boolean;
  products: Product[] = [];
  variablex!: number;

  constructor(
    private prodService: ProductsService, 
    private route: ActivatedRoute, 
    private cartService: CartService, 
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private location: Location,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
        this._getCategoryId(params.productid);
      }
    });
    this._initForm();
    // this._checkEditMode();
    
     

  }

  private _getCategoryId(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
        this.variablex = this.product.donation as any;
        if(this.variablex>=this.product.price!){
          (this.isDonationmax = true)
        }
        else {
          (this.isDonationmax = false);
        }
      });
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product!.id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }

  

  private _updateProduct(productFormData: FormData) {
    this.route.params.subscribe((params) => {
      this.currentProductId = params.productid;
    })
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
      }
    );
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
    });
  }
  get productForm() {
    return this.form.controls;
  }

  addStar() {
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
      this._updateProduct(productFormData);
  }
}
