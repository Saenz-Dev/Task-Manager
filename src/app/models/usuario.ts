export class Usuario {
    constructor(
        public id_usuario: number,
        public nombre: string,
        public email: string,
        public password: string,
        public fecha_registro: Date
    ) {}
}