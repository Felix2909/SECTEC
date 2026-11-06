// src/users/dto/create-user.dto.ts
import {
  IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min,ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UserRole, UserTurma, TipoAvaliador,} from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Fulano de Tal' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @ApiProperty({ example: 'fulano@escola.com' })
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  @IsNotEmpty({ message: 'O e-mail institucional é obrigatório.' })
  email_institucional: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ALUNO })
  @IsEnum(UserRole, { message: 'Cargo/Role inválido.' })
  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  role_cargo: UserRole;

    @ApiProperty({
    enum: TipoAvaliador,
    example: TipoAvaliador.REAL,
    required: false,
    description: 'Obrigatório quando o cargo for AVALIADOR.',
  })
  @ValidateIf((dto) => dto.role_cargo === UserRole.AVALIADOR)
  @IsEnum(TipoAvaliador, {
    message: 'O tipo de avaliador deve ser REAL ou FANTASMA.',
  })
  tipo_avaliador?: TipoAvaliador;

  @ApiProperty({ example: 'SenhaSegura123', required: false })
  @IsString()
  @IsOptional()
  senha?: string;

  @ApiProperty({ enum: UserTurma, example: UserTurma.INFORMATICA, required: false })
  @IsEnum(UserTurma, { message: 'Turma inválida.' })
  @IsOptional()
  turma?: UserTurma;

  @ApiProperty({ example: 3, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  ano?: number;
}
