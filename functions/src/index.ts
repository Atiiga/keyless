import * as functions from 'firebase-functions';


let prLat =0.000000
let prLng =0.000000



export const addLocation =  functions.database
.ref('gps_devices/{DeviceID}').onUpdate(async(Change, context)=> {
    try {
        console.log(prLat);
        console.log(prLng);

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
        const Latdif = prLat - Nlat;
        const Lngdif = prLng - Nlng;

        console.log(Latdif);
        console.log(Lngdif);
        const timeUpdated = new Date().toLocaleString();
        console.log(timeUpdated);
    
        //Calculating for the distance between two coordinates 
        const R = 6371e3; // Earth Radius in metres
        const  RprLant = prLat*Math.PI / 180; //previous latitude in radians
        const  RNlat  = Nlat*Math.PI/180;    //Current latitude in radians
        const  RLatdif = Latdif*Math.PI/180;  // Latitude difference in radians
        const  RLngdif = Lngdif*Math.PI/180;  // Longitude difference in radians

        const a = Math.sin(RLatdif/2)*Math.sin(RLatdif/2) +
                Math.cos(RprLant)*Math.cos(RNlat)*
                Math.sin(RLngdif/2)*Math.sin(RLngdif/2);

        const c = Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

        const d = R*c; // d= distance in meters
        console.log(d);

        if (d >= 1000){
            prLat = Nlat;
            prLng = Nlng;
            console.log(prLat);
            console.log(prLng);

          return   Change.after.ref.child(`track/${timeUpdated}`).set({
          //return   Change.after.ref.child(`track/1223`).set({

              Latitude:Nlat, 
              Longitude:Nlng,
              Time:timeUpdated});
        }
        else{
            return null
        }
        
    } catch (error) {
        console.log(error)
    }


});







