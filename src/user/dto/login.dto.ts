import { IsNotEmpty, IsString } from 'class-validator';
export class Login {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}
