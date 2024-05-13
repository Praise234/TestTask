import { Test, TestingModule } from '@nestjs/testing';
import { CompanydetailsService } from './companydetails.service';

describe('CompanydetailsService', () => {
  let service: CompanydetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanydetailsService],
    }).compile();

    service = module.get<CompanydetailsService>(CompanydetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
