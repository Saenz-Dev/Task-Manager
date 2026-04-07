export class Usuario {
    constructor(
        public id_usuario: number,
        public nombre: string,
        public correo: string,
        public contrasena: string,
        public fecha_registro: Date
    ) {}
}