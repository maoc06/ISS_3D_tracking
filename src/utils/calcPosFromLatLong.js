export default function calcPosFromLatLonRad({ lat, lon, radius }) {
  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  // let latitude_rad = (lat * Math.PI) / 180;
  // let longitude_rad = (lon * Math.PI) / 180;

  // let xPos = radius * Math.cos(latitude_rad) * Math.cos(longitude_rad);
  // let zPos = radius * Math.cos(latitude_rad) * Math.sin(longitude_rad);
  // let yPos = radius * Math.sin(latitude_rad);

  // return { x: xPos, y: yPos, z: zPos };

  return { x, y, z };
}
