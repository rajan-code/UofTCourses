import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/* The following code is commented out because is related to deployment
You should be able to run the app with ng serve -o

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { environment } from './environments/environment';

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: "uoft-courses.firebaseapp.com",
  projectId: "uoft-courses",
  storageBucket: "uoft-courses.appspot.com",
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
  measurementId: environment.measurementId
};

Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/