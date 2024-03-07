import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { ClincService } from 'src/app/services/clinc.service';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {

  clinicId: number | null = null;
  buttonLabel: string = 'Cadastrar';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    responsibleName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    city: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', []),
    complement: new FormControl('', [])
  });

  constructor(
    private activateRoute: ActivatedRoute,
    private clincService: ClincService,
    private route: Router,) { }

  ngOnInit(): void {
    const paramRaw = this.activateRoute.snapshot.paramMap.get('id');

    this.clinicId = paramRaw ? parseInt(paramRaw) : null;
    this.buttonLabel = (this.clinicId) ? 'Salvar' : 'Cadastrar';

    this.activateRoute.params.subscribe(
      () => {
        const clinica$ = this.clincService.loadByID(paramRaw);
        clinica$.subscribe(clinica => {
          this.updateForm(clinica)
        })
      }
    )
  }

  formSubmit() {
    if (this.clinicId) {
      this.updateClinic();
    } else {
      this.createClinic();
    }
  }

  private createClinic() {
    const nameControl = this.form.get('name');
    const responsibleNameControl = this.form.get('responsibleName');
    const phoneControl = this.form.get('phone');

    if (nameControl && responsibleNameControl && phoneControl) {
      if (nameControl.valid && responsibleNameControl.valid && phoneControl.valid) {
        let bodySubmit: ClincDTO = {
          id: (this.clinicId) ?? undefined,
          name: this.form.get('name')?.value,
          responsibleName: this.form.get('responsibleName')?.value,
          phoneNumber: this.form.get('phone')?.value,
          address: {
            cep: this.form.get('cep')?.value,
            uf: this.form.get('uf')?.value,
            cidade: this.form.get('city')?.value,
            bairro: this.form.get('neighborhood')?.value,
            logradouro: this.form.get('street')?.value,
            numero: this.form.get('number')?.value,
            complemento: this.form.get('complement')?.value,
          }
        };

        this.clincService.createNewClinic(bodySubmit).subscribe({
          next: (response: any) => {
            console.log('Nova clínica criada:', response);
            this.route.navigate([RoutesEnum.SESSION_LIST]);
          },
          error: (error: any) => {
            console.error('Erro ao criar nova clínica:', error);
          }
        });
      } else {
        console.log("Preenche todos os campos Obrigatorios")
      }
    } else {
      console.log("Erro ao enviar")
    }
  }

  private updateClinic() {
    this.clincService.update(this.clinicId, this.form.value).subscribe({
      next: (response: any) => {
        console.log('Clínica atualizada com sucesso:', response);
        this.route.navigate([RoutesEnum.SESSION_LIST]);
      },
      error: (error: any) => {
        console.error('Erro ao atualizar clínica:', error);
      }
    });
  }



  updateForm(clinica: any) {
    this.form.patchValue({
      id: clinica.id,
      name: clinica.name,
      responsibleName: clinica.responsibleName,
      phone: clinica.phoneNumber,
      address: {
        cep: clinica.address.cep,
        uf: clinica.address.uf,
        city: clinica.address.cidade,
        neighborhood: clinica.address.bairro,
        street: clinica.address.logradouro,
        number: clinica.address.numero,
        complement: clinica.address.complemento
      }
    });
  }


  goBack(): void {
    this.route.navigate([RoutesEnum.SESSION_LIST]);
  }



}
