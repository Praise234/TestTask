import { Test, TestingModule } from '@nestjs/testing';
import { CompanydetailsController } from './companydetails.controller';
import { CompanydetailsService } from './companydetails.service';

describe('CompanydetailsController', () => {
  let controller: CompanydetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanydetailsController],
      providers: [CompanydetailsService],
    }).compile();

    controller = module.get<CompanydetailsController>(CompanydetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
