import * as functions from 'firebase-functions';

export const addLocation =  functions.database
.ref('gps_devices/{DeviceID}').onUpdate(async(Change, context)=> {
    try {
        const Pcoords = await Change.before.val();
        const Plat =Pcoords.Latitute;
        const Plng =Pcoords.Longitute;
        const Ncoords = await Change.after.val();
        const Nlat =Ncoords.Latitute;
        const Nlng =Ncoords.Longitute;
        console.log(Plat);
        console.log(Plng);
        console.log(Nlat);
        console.log(Nlng);
        console.log(Pcoords);
        console.log(Pcoords);
        const Latdif = Plat - Nlat;
        const lngdif = Plng - Nlng;

        console.log(Latdif);
        console.log(lngdif);
        const timeUpdated = new Date().toLocaleString();
        console.log(timeUpdated);
    
       // if ((Latdif<=2||-2)||(lngdif<=2||-2)){}

        if (((Latdif>=2)||(lngdif>=2))||((Latdif<=-2)||(lngdif<=-2))){
  
          return   Change.after.ref.child(`track/${timeUpdated}`).set({
          //return   Change.after.ref.child(`track/1223`).set({

              Latitude:Plat, 
              Longitude:Plng,
              Time:timeUpdated});
        }
        else{
            return null
        }
        
    } catch (error) {
        console.log(error)
    }

});







