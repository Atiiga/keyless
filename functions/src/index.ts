import * as functions from 'firebase-functions';


let prLat =0.000000;
let prLng =0.000000;
let tCount =0;



export const addLocation =  functions.database
.ref('gps_devices/{DeviceID}').onUpdate(async(Change, context)=> {
    try {
        console.log(prLat);
        console.log(prLng);

        const Pcoords = await Change.before.val();
        const Plat =Pcoords.Latitude;
        const Plng =Pcoords.Longitude;
        const Ncoords = await Change.after.val();
        const Nlat =Ncoords.Latitude;
        const Nlng =Ncoords.Longitude;
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
        const date = new Date()
        let day = date.getDate().toString();
        let month = (date.getMonth()+1).toString();
        let  year = date.getFullYear().toString();
        let hours = date.getHours().toLocaleString();
        let minutes = date.getMinutes().toLocaleString();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        const dateFormat = year + '-'+ month +'-' + day
        const timeFormat = hours + ':'+ minutes;
        console.log(dateFormat);
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
            prLat = Nlat; //Replace the previous latitude
            prLng = Nlng; // Replace the previous Longitude
            tCount++; // increase the count

          return   Change.after.ref.child(`track/${dateFormat}/point`+`${tCount}`).set({
              Latitude:Nlat, 
              Longitude:Nlng,
              Time:timeFormat});
        }
        else{
            return null
        }
        
    } catch (error) {
        console.log(error)
    }


});







