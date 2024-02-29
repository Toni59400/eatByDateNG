import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort, MatSortModule} from "@angular/material/sort";
import {CommonModule} from "@angular/common";
import {AccueilService} from "../accueil.service";
import {async} from "rxjs";

export interface Product{
  id: number;
  apiId: string;
  expirationDate: string;
  quantite: number;
}

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule],
})
export class TableProductComponent implements AfterViewInit , OnInit, OnChanges{
  @Input() data: Product[] = [];

  displayedColumns: string[] = ['apiId', 'genericName', 'expirationDate', 'quantite'];
  dataSource = new MatTableDataSource(this.data);
  constructor(private _liveAnnouncer: LiveAnnouncer, private homeService : AccueilService) {}

  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
  }


  getDayBeforeEnd(date:string){
    const expirationDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = expirationDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays
  }

  getRowColor(daysRemaining: number): string {
    if (daysRemaining <= 0) {
      return 'expired'; // Classe CSS pour les éléments expirés
    } else if (daysRemaining <= 10) {
      return 'urgent';
    } else if (daysRemaining <= 30) {
      return 'near-expiration'; // Classe CSS pour les éléments proches de l'expiration
    } else if (daysRemaining <= 70) {
      return 'warning'; // Classe CSS pour les éléments avec un avertissement d'expiration
    } else {
      return 'normal'; // Aucune classe par défaut
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
