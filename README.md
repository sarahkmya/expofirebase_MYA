# An Expo Example with firebase RealTime Database

The examples that I found used firestore. This seems simpler to me.

1. install pre-requisites on Mac `sudo chown -R $USER:staff /usr/local/lib`, `sudo chown -R $USER:staff /usr/local/lib`, `brew install watchman`
2. On all os `npm install -g yarn expo-cli @expo/ngrok`
3. You will need to edit ./src/firebase/config.js

```

import firebase from 'firebase'
import '@firebase/auth';
import '@firebase/database';

const firebaseConfig = {
    apiKey: "Copy Your config from the firebase console"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} 
export { firebase };

```
4. While on the firebase console you will need to set an authentication method for email/password and configure your realtime database with the rules in ./firebaserules.json
5. `yarn`
6. `yarn start`

I set this up to be an app to configure pop-up meals. If you were in my class you were challenged to add fields for date and place. You were also challenged to make the edit button work.
