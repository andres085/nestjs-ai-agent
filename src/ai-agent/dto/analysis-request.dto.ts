import { IsEnum, IsString } from "class-validator";


export enum AnalysisPeriod {
  SEVEN_DAYS = 7,
  FOURTEEN_DAYS = 14,
  THIRTY_DAYS = 30,
  SIXTY_DAYS = 60,
  NINETY_DAYS = 90,
}

export class AnalysisRequestDto {
  @IsString()
  socialAccountId: string;

  @IsEnum(AnalysisPeriod)
  timePeriod: AnalysisPeriod;
}
