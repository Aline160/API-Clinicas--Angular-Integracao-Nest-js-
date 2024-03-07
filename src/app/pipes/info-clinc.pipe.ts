import { Pipe, PipeTransform } from '@angular/core';
import { ClincDTO } from '../dtos/clinc.dto';

@Pipe({ name: 'clincInfo' })
export class InfoClincPipe implements PipeTransform {

    constructor() { }

    transform(clincInfo: ClincDTO): string {
        const formattedCep: string = `${clincInfo.address.cep.slice(0, 5)}-${clincInfo.address.cep.slice(5)}`;

        return `
            Cep: ${formattedCep}\n
            Cidade: ${clincInfo.address.cidade}\n
            Endereço: ${clincInfo.address.logradouro}, Nº ${clincInfo.address.numero}`;
    }
}