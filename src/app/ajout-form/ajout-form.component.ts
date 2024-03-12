import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccueilService} from "../accueil.service";
import {NotificationService} from "../notification.service";



export interface ReserveType{
  id:number;
  name:string;
}

export interface Reserve{
  id:number;
  ReserveNom: string;
  reserveType: ReserveType;
}
@Component({
  selector: 'app-ajout-form',
  templateUrl: './ajout-form.component.html',
  styleUrls: ['./ajout-form.component.scss']
})
export class AjoutFormComponent implements OnInit {
  ajoutForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AccueilService) {

  }

  ngOnInit(): void {
    this.ajoutForm = this.formBuilder.group({
      codeBarre: ['', Validators.required],
      dlc: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.ajoutForm.valid) {
      await this.service.getReserveById(parseInt(localStorage.getItem("reserve")!)).then(async ({data}) => {
        console.log(this.ajoutForm.value);
        console.log(this.ajoutForm.get("dlc")?.value);
        console.log(data)
        if(data.id != null && this.ajoutForm.get('quantity')?.value != null && this.ajoutForm.get("codeBarre")?.value != null) {
          this.service.add({
            "quantite": this.ajoutForm.get('quantity')?.value,
            "reserve": data,
            "apiId": this.ajoutForm.get("codeBarre")?.value,
            "expirationDate": this.ajoutForm.get('dlc')?.value
          })
        }
      });

      this.ajoutForm.reset();
    } else {
      // Gérer le cas où le formulaire n'est pas valide, par exemple en affichant un message d'erreur à l'utilisateur.
    }
  }
}
