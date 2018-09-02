// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyATqNzPJuMyCeZUBwFVJG34Gp5ZnYKEouQ",
    authDomain: "uw-course-planner.firebaseapp.com",
    databaseURL: "https://uw-course-planner.firebaseio.com",
    projectId: "uw-course-planner",
    storageBucket: "uw-course-planner.appspot.com",
    messagingSenderId: "191567984200"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
