import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort, MatSortModule} from "@angular/material/sort";
import {CommonModule} from "@angular/common";
import {AccueilService} from "../accueil.service";
import {MatPaginatorModule, MatPaginator} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {AjoutFormComponent} from "../ajout-form/ajout-form.component";

export interface ReserveType{
  id:number;
  name:string;
}

export interface Reserve{
  id:number;
  ReserveNom: string;
  reserveType: ReserveType;
}

export interface Product{
  id: number;
  reserve: Reserve;
  apiId: string;
  expirationDate: string;
  quantite: number;
}


@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class TableProductComponent implements AfterViewInit , OnInit, OnChanges{
  @Input() data: Product[] = [];
  products: Product[] = [];
  finish: boolean = true;

  displayedColumns: string[] = ['apiId', 'genericName', 'expirationDate', 'quantite', 'action'];
  dataSource = new MatTableDataSource(this.data);
  constructor(private _liveAnnouncer: LiveAnnouncer, private homeService : AccueilService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.dataSource.data = this.data;
    localStorage.setItem("reserveJ", JSON.stringify(this.data[0].reserve));

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAjoutFormDialog(): void {
    const dialogRef = this.dialog.open(AjoutFormComponent, {
      width: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("ferme")
        this.homeService.getProductOfReserve(parseInt(localStorage.getItem("reserve")!)).then(async ({data}) =>{
          this.products = data;
          for (const product of data) {
            const genericName = await this.homeService.getProductName(product.apiId);
            if(genericName.data.product_name) {
              product.product_name = genericName.data.product_name;
              product.imgUrl = genericName.data.imageUrl;
            }else{
              product.product_name = "Produit inexistant dans l'API"
            }
          }
          this.dataSource.data = this.products;
        });
    });
  }


  getDayBeforeEnd(date: string) {
    const expirationDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = expirationDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    const expirationFormatted = `${expirationDate.getDate().toString().padStart(2, '0')}/${(expirationDate.getMonth() + 1).toString().padStart(2, '0')}`;
    if(differenceInDays <= 0){
      return `Produit périmé !`;
    } else {
      return `${differenceInDays} (${expirationFormatted})`;
    }
  }

  async incrementQuantity(element: Product) {
    this.finish = false;
    if (element) {
      console.log(element);
      element.quantite++;

      this.homeService.saveProduct(element);
    } else {
      console.error('L\'élément est undefined ou null');
    }

    this.finish = true;
  }

  async decrementQuantity(element: Product) {
    if(element.quantite == 1){
      this.finish = false;
      element.quantite--;

      await this.homeService.saveProduct(element);

      this.homeService.getProductOfReserve(parseInt(localStorage.getItem("reserve")!)).then(async ({data}) =>{
        this.products = data
        for (const product of data) {
          const genericName = await this.homeService.getProductName(product.apiId);
          product.product_name = genericName.data.product_name;
        }
        this.dataSource.data = this.products
      })

    } else if (element && element.quantite > 0) {
      console.log(element);
      element.quantite--;
      this.homeService.saveProduct(element);

    } else {
      console.error('L\'élément est undefined ou null, ou la quantité est inférieure ou égale à 0');
    }
    this.finish = true;
  }

  deleteProduct(element: any) {
    this.finish = false;
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
    }
    this.finish = true;
  }

  getRowColor(daysRemaining: string): string {
    const daysRemaining2 = parseInt(daysRemaining);
    if (daysRemaining2 <= 0) {
      return 'expired';
    } else if (daysRemaining2 <= 10) {
      return 'urgent';
    } else if (daysRemaining2 <= 30) {
      return 'near-expiration';
    } else if (daysRemaining2 <= 70) {
      return 'warning';
    } else if (daysRemaining == "Produit périmé !"){
      return 'perime'
    }else {
      return 'normal';
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  protected readonly console = console;
}
