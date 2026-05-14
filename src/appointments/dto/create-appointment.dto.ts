import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {

    @IsNotEmpty()
    @IsDate()
    datetime!: Date;

    @IsString({ message: 'motive es requerido' })
    @IsNotEmpty({ message: 'motive es requerido' })
    motive!: string;
}
