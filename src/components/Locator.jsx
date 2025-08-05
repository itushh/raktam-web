import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Locator = () => {
  const locations = [
  [18.5147, 73.8560, "Jankalyan Blood Bank"],
  [18.5218, 73.8687, "K.E.M. Hospital Blood Bank"],
  [18.5306, 73.8790, "Inlaks & Budhrani Hospital Blood Bank"],
  [18.5255, 73.8789, "Ruby Hall Clinic Blood Center"],
  [18.5165, 73.8796, "Sasoon General Hospital Blood Bank"],
  [18.5085, 73.8530, "Poona Hospital and Research Centre Blood Bank"],
  [18.5135, 73.8735, "Indian Red Cross Society Blood Bank"],
  [18.5057, 73.8214, "Deenanath Mangeshkar Hospital Blood Bank"],
  [18.5145, 73.8550, "Acharya Anandrishiji Pune Blood Bank"],
  [18.5222, 73.8647, "Jehangir Nursing Home Blood Bank"],
  [18.5301, 73.8447, "Navjeevan Blood Bank"],
  [18.5216, 73.8631, "Om Blood Bank"],
  [18.5029, 73.9317, "Akshay Blood Centre"],
  [18.4632, 73.8267, "Smt Kashibai Navale General Hospital Blood Bank"],
  [18.5186, 73.8576, "Armed Forces Medical College (AFMC) Blood Bank"],
  [18.5097, 73.9168, "Pune Blood Bank (Sanjeevani Hospital)"],
  [18.4907, 73.8504, "Aadhar Blood Bank"],
  [18.5630, 73.7915, "Sai Shree Blood Storage Centre"],
  [18.5113, 73.9213, "Noble Blood Bank"],
  [18.6366, 73.8242, "Vishweshwar Blood Bank (D.Y. Patil Hospital)"],
  [18.6291, 73.7431, "Janaseva Blood Centre"],
  [18.6479, 73.8115, "Krantiveer Chapekar Bandhu Blood Bank"],
  [18.6738, 73.7844, "Star Blood Storage Center (Star Hospital)"],
  [18.5119, 73.8534, "I.S.I. Blood bank"],
  [18.5108, 73.8580, "Deendayal Memorial Hospital Blood Bank"],
  [18.5152, 73.8541, "Mahatma Gandhi Eye Hospital Blood Bank"],
  [18.5661, 73.8053, "Pune Chest Hospital Blood Bank"],
  [18.5701, 73.8078, "E.S.I.S Hospital Blood Bank"],
  [18.4925, 73.8505, "Gholap Blood Bank"],
  [18.5076, 73.8508, "Rakesh Jain Memorial Blood Bank"],
  [18.6457, 73.8066, "Lokmanya Medical Foundation Blood Bank"],
  [18.6367, 73.8080, "Talera Hospital Blood Bank"],
  [18.5284, 73.8519, "Command Hospital (Southern Command) Blood Bank"],
  [18.4550, 73.8534, "Bharati Hospital Blood Bank"],
  [18.5228, 73.8569, "Sassoon Hospital Sarvopchar Blood Bank"],
  [18.5307, 73.8791, "Inlaks Budhrani Hospital Blood Bank"],
  [18.6186, 73.7667, "PCMC YCM Hospital Blood Bank"],
  [18.5601, 73.9103, "Aditya Birla Memorial Hospital Blood Bank"],
  [18.4891, 73.8051, "Sahyadri Super Speciality Hospital Blood Bank"],
  [18.5112, 73.8568, "Hardikar Hospital Blood Bank"],
  [18.5582, 73.8021, "Sancheti Hospital Blood Bank"],
  [18.5195, 73.8563, "King Edward Memorial Hospital Blood Bank"],
  [18.5218, 73.8596, "Pune Blood Bank (at Dr. Ambedkar Road)"],
  [18.5444, 73.8344, "Jeevan Jyoti Blood Bank"],
  [18.5670, 73.7431, "Lifeline Blood Bank"],
  [18.5098, 73.8037, "Pune Serological Institute"],
  [18.5215, 73.8645, "City Hospital Blood Bank"],
  [18.5282, 73.8587, "KEM Hospital Rasta Peth Blood Bank"],
  [18.5255, 73.8789, "Ruby Hall Clinic Sassoon Road Blood Bank"],
  [18.6041, 73.7915, "Pimpri Serological Institute"]
];

  return (
    <div className='w-full h-[100dvh] top-0 left-0 fixed'>
      <MapContainer center={[18.625861, 73.774972]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc[0], loc[1]]}>
            <Popup>{loc[2]}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Locator;
