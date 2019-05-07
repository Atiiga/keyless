import * as functions from 'firebase-functions';

export const addLocation =  functions.database
.ref('gps_devices/{DeviceID}').onUpdate((Change, context)=> {
    const Pcoords = Change.before.val();
    const Plat =Pcoords.latitude;
    const Plng =Pcoords.longitude;
    const Ncoords = Change.after.val();
    const Nlat =Ncoords.latitude;
    const Nlng =Ncoords.longitude;
    console.log(Pcoords);
    console.log(Ncoords);
   /*var Track = {
        Plat,
        Plng,
    };*/
    if ((Plat-Nlat<=2||-2)||(Plng-Nlng<=2||-2)){
        console.log(Plat-Nlng);
        console.log(Plng-Nlng);
        const timeUpdated = Date.now();
        console.log(timeUpdated);

      return   Pcoords.ref.child('track').set({Plat,Plng,timeUpdated});
    };
});







