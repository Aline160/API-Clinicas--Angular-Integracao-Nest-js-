import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ClincService } from 'src/app/services/clinc.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  clinics: ClincDTO[] = []



  constructor(
    private clincService: ClincService,
    private toastService: ToastService,
    private route: Router,
  ) { }



  ngOnInit(): void {
    this.clincService.getAllClinics().subscribe({
      next: (clinics: ClincDTO[]) => {
        this.clinics = clinics;
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      }
    });


  }

  redirectNewClinc() {
    this.route.navigate([RoutesEnum.SESSION_NEW_CLINC]);
  }

  edit(clincId: any): void {
    console.log(`Id da clínica: ${clincId}`);
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clincId}`]);
  }

  loadClinics() {
    this.clincService.getAllClinics().subscribe({
      next: (clinics: ClincDTO[]) => {
        this.clinics = clinics;
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      }
    });
  }


  delete(clinicId: any) {
    this.clincService.deleteClinic(clinicId).subscribe({
      next: () => {
        this.toastService.showSuccess(`Clínica removida com sucesso`);
        this.loadClinics();
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao remover clínica`);
      }
    });
  }

}
