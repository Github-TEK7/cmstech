import { Component, OnInit, Input } from '@angular/core';
import { CartService, CartItem } from '@frontend/orders';
import { Product } from '../../models/product';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@frontend/products';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity!: 1;
  editmode = true;
  form!: FormGroup;
  isSubmitted = false;
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;
  isDonationmax!: boolean;
  products: Product[] = [];
  variablex!: Product;

  constructor(
    private cartService: CartService,
    private prodService: ProductsService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {
    this._origen();
  }

  private _origen() { 
    this.prodService
      .getProduct(this.product.id!)
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

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }

  // private _getCategoryId(id: string) {
  //   this.prodService
  //     .getProduct(id)
  //     .pipe(takeUntil(this.endSubs$))
  //     .subscribe((resProduct) => {
  //       this.product = resProduct;
  //       this.variablex = this.product.donation as any;
  //       console.log(this.variablex);
  //       if(this.variablex=="618bc920ba34dbf7123d1ee6"){
  //         (this.isCategoryBen = true)
  //       }
  //       else {
  //         (this.isCategoryBen = false);
  //       }
  //     });
  // }
}
