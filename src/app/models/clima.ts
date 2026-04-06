export class Clima {
    constructor(
        public id_clima: number,
        public temperatura: number,
        public descripcion: string,
        public fecha: Date,
        id_tarea: number
    ) {}
}