import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  initializeApp as initializeClientApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import * as admin from 'firebase-admin';
import { Auth, getAuth } from 'firebase/auth';

@Injectable()
export class FirebaseService {
    public app: FirebaseApp;
    public auth: Auth;
    public theApp: admin.app.App;

    constructor(private configService: ConfigService) {
        // Initialize Firebase client app
        if (!getApps().length) {  // Check if there is no initialized app
            this.app = initializeClientApp({
                apiKey: this.configService.get<string>('apiKey'),
                appId: this.configService.get<string>('appId'),
                authDomain: this.configService.get<string>('authDomain'),
                measurementId: this.configService.get<string>('measurementId'),
                messagingSenderId: this.configService.get<string>('messagingSenderId'),
                projectId: this.configService.get<string>('projectId'),
                storageBucket: this.configService.get<string>('storageBucket')
            });
            this.auth = getAuth(this.app);
        } else {
            this.app = getApp();  // Use the already initialized app
            this.auth = getAuth(this.app);
        }

        // Initialize Firebase Admin SDK
        if (!admin.apps.length) {
            var serviceAccount = require("../../takehome-9a134-firebase-adminsdk-jvt4w-da95295d1c.json");
            this.theApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } else {
            this.theApp = admin.app();  // Use the already initialized admin app
        }
    }

    getAdmin() {
        return this.theApp;
    }
}
