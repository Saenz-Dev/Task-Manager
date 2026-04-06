export class Notificacion {
    constructor(
        public id_notificacion: Int16Array,
        public mensaje: string,
        public fecha_envio: Date,
        public leida: boolean,
        public id_usuario: number,
        public id_tarea: number
    ) {}
}