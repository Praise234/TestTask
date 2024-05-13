import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountType, Prisma } from '@prisma/client';
import { isNumber } from 'class-validator';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CompanydetailsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCompanydetailDto: Prisma.CompanyDetailsCreateInput, userData:any) {

    const {accountType} = await this.databaseService.accounts.findFirst({
      where: {email: userData.email}
    })

    if(accountType === "B") {
      throw new UnauthorizedException('You are not authorized to perform this operation');
    }

    const companyName = createCompanydetailDto.companyName;
    const numOfUsers = createCompanydetailDto.numberOfUsers;
    const numOfProducts = createCompanydetailDto.numberOfProducts;
    const percentage = createCompanydetailDto.percentage;





    // validate companyName
    if(companyName === null || companyName === undefined || companyName === "" || companyName.length < 3)
      throw new BadRequestException("Please enter at least 3 characters for company name")

    // validate number of users
    if(numOfUsers === null || numOfUsers === undefined || numOfUsers < 1 || !isNumber(numOfUsers))
      throw new BadRequestException("Please enter a valid number of users")

    // validate number of products
    if(numOfProducts === null || numOfProducts === undefined || numOfProducts < 1 || !isNumber(numOfProducts))
      throw new BadRequestException("Please enter a valid number of products")

    // validate percentage
    if(percentage === null || percentage === undefined || percentage <= 0 || !isNumber(percentage) )
      throw new BadRequestException("Please enter a valid percentage")

    const calcPercent = (numOfProducts/numOfUsers) * 100; // system calculation of percentage


    if(percentage !== calcPercent)
      throw new BadRequestException("Please enter at valid percentage") // check if percentage matches


    try {
      const createCompany = await this.databaseService.companyDetails.create({ // Add company
        data: createCompanydetailDto
      })

      if(! await this.databaseService.notifications.create({ // save notification
        data: {
          activityId: createCompany.id,
          notificationType: 'NEWCOMPANY',
          recepientId: 2
        }
      })) throw new BadRequestException('Notification Error');
      
      return {
        statusCode: 201,
        company: createCompany,
        message: "New company added successfully"
  
      }
    } catch (error) {
      throw new BadRequestException('An error occurred', error);
    }

    
  }

  async findAll() {

    try {
      
      const companies = await this.databaseService.companyDetails.findMany({}); // Get all companies
  
      return {statusCode: 200, companies, message: "Companies fetched successfully"}

    } catch (error) {
      throw new BadRequestException('An error occurred', error);
    }

  }

  async findOne(id: number) {


    try {
      
      const company = await this.databaseService.companyDetails.findFirst({ // Get company by id
        where: {
          id
        }
      });

      if(company === null) {
        throw new NotFoundException('Record does not exist');
      }
  
  
      return {statusCode: 200, company, message: "Company fetched successfully"}

    } catch (error) {
      if (error instanceof NotFoundException) {
        // catch any BadRequestExceptions
        throw error;
      } else {
        // handle unexpected errors
        throw new BadRequestException('An error occurred', error.message);
      }
    }

  }

  // update(id: number, updateCompanydetailDto: UpdateCompanydetailDto) {
  //   return `This action updates a #${id} companydetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} companydetail`;
  // }
}
