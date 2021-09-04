![alt text](https://i.imgur.com/2EHGBkY.png)

## Piquante

Pour faire fonctionner le Projet, vous devez installer :

- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 

Ensuite, depuis un terminal de commande, rendez-vous dans le dossier FrontEnd du projet et taper: "npm install".
Cela installera tout les packages necessaire pour que le projet fonctionne. Répéter la même opération dans le dossier BackEnd.
Sur Windows, ces installations peuvent nécessiter d'utiliser PowerShell en tant qu'administrateur.

Enfin, il vous faudra également le fichier ".env" qui n'est pas fournit ici pour des raisons de sécurité. Il faudra ensuite le placer dans le dossier BackEnd.


## Démarrer le front-end

Depuis le dossier front-end, taper: "ng serve" pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

## Démarrer le back-end
Depuis le dossier back-end, taper: "nodemon server" pour démarrer le backend. Si le fichier ".env" est bien détécté, la connexion à la BDD Mongoose fonctionnera.

