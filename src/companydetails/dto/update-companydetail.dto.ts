import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanydetailDto } from './create-companydetail.dto';

export class UpdateCompanydetailDto extends PartialType(CreateCompanydetailDto) {}
