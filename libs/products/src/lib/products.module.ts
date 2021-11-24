import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@frontend/orders';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@frontend/ui';
import { ElementsHomeComponent } from './components/elements-home/elements-home.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import {FieldsetModule} from 'primeng/fieldset';
import { SuscribeteHomeComponent } from './components/suscribete-home/suscribete-home.component';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ButtonModule, CheckboxModule, FormsModule, ReactiveFormsModule, RatingModule, InputNumberModule, UiModule, GalleriaModule, ImageModule, FieldsetModule, InputTextModule,],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent, ElementsHomeComponent, SuscribeteHomeComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent, ElementsHomeComponent, SuscribeteHomeComponent],
  providers: [MessageService]
})
export class ProductsModule { }
