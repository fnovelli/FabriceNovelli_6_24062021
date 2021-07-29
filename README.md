![alt text](https://i.imgur.com/2EHGBkY.png)

## Piquante

Pour faire fonctionner le Projet, vous devez installer :

- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 
- Nodemon (npm install -g nodemon)
- Express (npm install --save express)
- Cors (npm install cors)
- Mongoose (npm install --save mongoose)
- Mongoose unique validator (npm install --save mongoose-unique-validator)
- Bcrypt (npm install --save bcrypt)
- Jsonwebtoken (npm install --save jsonwebtoken)
- Multer (npm install --save multer)

Enfin il vous faudra également le fichier token.json qui n'est pas fournit ici pour des raisons de sécurité.


Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

## Démarrer le front-end

Depuis le dossier front-end, taper ng serve pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

##Démarrer le back-end
Depuis le dossier back-end, taper nodemon server pour démarrer le backend. Si le fichier token.json est bien détécté, la connexion à la BDD  Mongoose fonctionnera.

