#GBFUAPP - Client
GBFUAPP (Granblue Fantasy Utility Application) is a project wanting to bring multiples tools for the game Granblue Fantasy.  
Client part of the project. Check this [link](https://github.com/Abikebuk/GBFUAPP-server) for the server part.  
This version only contains a prototype of a "raid finder".

## Feature
* **Raid Finder:** Fetch the "backup request" from player asking for help in the game. It takes advantage of the  in-game function of backup request on Twitter.
  * (on server) Real-time gathering of Tweets of players asking for help then process and stream the data.
  * (on server) Self-building database and translation ``ja <-> en`` of unregistered raids. Checks information on the [(unofficial) english wiki](https://gbf.wiki/).
  * Real-time display of selected raids from backup requests.

##Installation
**This project only contains the client that display data. It is meant to be used with an api server which you can find [here](https://github.com/Abikebuk/GBFUAPP-client)**

Use your favorite package manager to install the dependencies such as ``npm`` or ``yarn``.
```shell
npm install
```
Either set the following environment variables or create a ``.env`` file in the root with the following content.
```dotenv
# uri of the server, take care of putting a '/' at the end like in the example
REACT_APP_SERVER_HOSTNAME=http://server-hostname/
```

##Usage
If you want to run your project locally, run: 
````shell
npm run start
````
You can also build your project and find a minimized static build of the project on ``/build`` by running:  
````shell
npm run build
````

## Licence
This project is under [MIT](https://choosealicense.com/licenses/mit/) Licence.