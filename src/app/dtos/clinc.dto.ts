export interface ClincDTO {
    id?: number;
    name: string;
    phoneNumber: string;
    responsibleName: string;
    address: {
        cep: string;
        uf: string;
        cidade: string;
        bairro: string;
        logradouro: string;
        numero?: string;
        complemento?: string;
    }
}


