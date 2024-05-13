import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoginAccountDto } from './dto/login-account.dto';
import { DatabaseService } from 'src/database/database.service';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';


@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService, private firebaseService: FirebaseService) {

  }

  async validateUser(token: string): Promise<any> {
    try { 
      const firebaseApp = this.firebaseService.getAdmin();
      const decodedToken = await firebaseApp.auth().verifyIdToken(token, true);
      return { uid: decodedToken.uid, email: decodedToken.email };
    } catch (error) {
      console.log(error)
      throw new Error('Invalid token');
    }
  }

  async create(createAccountDto: Prisma.AccountsCreateInput) {
    
    const bcrypt = require('bcrypt'); // import bcrypt
    const username = createAccountDto.username; //username
    const email = createAccountDto.email; // email
    const pword = createAccountDto.password // password
    const accountType = "A"; // account type


    // validate email address
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email === "" || email === undefined || email === null || !regex.test(String(email).toLowerCase())) {
      throw new BadRequestException('Please enter a valid email');
    }
    
    const emailExists = await this.databaseService.accounts.findUnique({
      where: {
        email
      }
    });

    if (emailExists) {
      throw new BadRequestException('Email already exists.');
    }

    // validate username
    if(username === "" || username === null || username === undefined || username.length < 2) {
      throw new BadRequestException('Please enter a valid username');
    }
    
    const usernameExists = await this.databaseService.accounts.findUnique({
      where: {
        email,
        username
      }
    });

    if (usernameExists) {
      throw new BadRequestException('Username already exists.');
    }

    // validate password
    if(pword === undefined || pword === null || pword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    } 

    const hashedPassword = await bcrypt.hash(pword, 10); // hash password

    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        pword
      );
  
      if(userCredential) {
  
        const createUser = await this.databaseService.accounts.create({
          data: {
            email,
            accountType,
            password: hashedPassword,
            username,
          }
        });
    
    
    
        const { password, ...userData} = createUser;

        const {uid, refreshToken} = userCredential.user;
        const {token, expirationTime} = await userCredential.user.getIdTokenResult();
    
    
        return {
          statusCode: 201,
          userCredentials: { ...userData, uid, refreshToken, token, expirationTime},
          message: "Account created successfully"
        }
      }
      
    } catch (error) {
      const firebaseAuthError = error as AuthError;

      if (firebaseAuthError.code === 'auth/email-already-in-use') {
        throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
      }

      throw new BadRequestException('Your request could not be processed, please try again later');

    }




   
  }

  async login(loginAccountDto: LoginAccountDto ) {

    const bcrypt = require('bcrypt'); // import bcrypt
    const email = loginAccountDto.email; // email
    const pword = loginAccountDto.password // password
    // const accountType = "B"; // account type


    try {

      
      // validate email address
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if(email === "" || email === undefined || email === null || !regex.test(String(email).toLowerCase())) {
        throw new BadRequestException('Please enter a valid email');
      }
      
      const userData = await this.databaseService.accounts.findFirst({ // find user data by email
        where: {
          email
        }
      });
  
      if(!userData) {
        throw new NotFoundException('User does not exist.');
      }
  
      // validate password
      if(pword === undefined || pword === null || pword.length < 8) {
        throw new BadRequestException('Password must be at least 8 characters');
      }
  
      const userCredential: UserCredential = await signInWithEmailAndPassword(this.firebaseService.auth, email, pword);
  
  
      if(userCredential) {
        
        const isMatch = await bcrypt.compare(pword, userData.password); // check if passwords match
        console.log(pword, userData.password)
        if(!isMatch) {
          throw new BadRequestException('Username and Password do not match');
        }
    
        const { password, ...user} = userData;
        
        const notification = await this.databaseService.notifications.findMany({
          where: {
            recepientId: userData.id
          }
        })


        const {uid, refreshToken} = userCredential.user;
        const {token, expirationTime} = await userCredential.user.getIdTokenResult();
    
    
        return {
          statusCode: 202,
          userCredentials: { ...userData, uid, refreshToken, token, expirationTime },
          message: "Login successful"
        }

      }
      
    } catch (error) {
      const firebaseAuthError = error as AuthError;

      if (firebaseAuthError.code === 'auth/wrong-password') {
        throw new HttpException(
          'Email or password incorrect.',
          HttpStatus.FORBIDDEN,
        );
      }

      if (firebaseAuthError.code === 'auth/user-not-found') {
        throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);
      }

      throw new BadRequestException('Your request could not be processed, please try again later');
    }


    
  }

  // async findAll() {
  //   return `This action returns all accounts`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // async update(id: number, updateAccountDto: Prisma.AccountsUpdateInput) {
  //   // return `This action updates a #${id} account`;

  //   return await this.databaseService.accounts.update({
  //     where: {id},
  //     data: updateAccountDto
  //   })
  // }

  async remove(id: number) {
    return await this.databaseService.accounts.delete({where:{id}})
  }
}
