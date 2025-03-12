import logo from './logo.svg';
// import geoJSON from './fireData.json';
import './App.css';
import CustomMarker from './components/marker';
import Details from './components/details';
import styled from "styled-components";
import { Chip,Dialog, DialogContent, Card, div, CardContent, Typography, Button,Icon,IconButton,Select,MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect, useRef } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

let API_KEY = "AIzaSyB1GMYLuVbGQw-hz_lMfZfEUUXh3aEFOek";
const tempData1 = [
  {
    coords: { lat: 34.032432437404275, lng: -118.52211997152689 },
    title: "Donation Drop-Off Here",
    body: "This location is currently marked as 'Reconstruction'. Donation Drop-Off Here is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-28",
    type: "Reconstruction"
  },
  {
    coords: { lat: 34.04128062212254, lng: -118.51827621459961 },
    title: "Home Construction Underway",
    body: "This location is currently marked as 'Reconstruction'. Home Construction Underway is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-04",
    type: "Reconstruction"
  },
  {
    coords: { lat: 34.04954910712297, lng: -118.51868674398783 },
    title: "Construction Delays",
    body: "This location is currently marked as 'Construction Update'. Construction Delays is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-01",
    type: "Construction Update"
  },
  {
    coords: { lat: 34.03516388661733, lng: -118.53681564331055 },
    title: "Home Construction Underway",
    body: "This location is currently marked as 'Construction Update'. Home Construction Underway is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-15",
    type: "Construction Update"
  },
  {
    coords: { lat: 34.03897611613634, lng: -118.52967307211283 },
    title: "Construction Delays",
    body: "This location is currently marked as 'Fire Recovery'. Construction Delays is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-05",
    type: "Fire Recovery"
  },
  {
    coords: { lat: 34.055077219495494, lng: -118.51261138916016 },
    title: "Land Cleared for Build",
    body: "This location is currently marked as 'Reconstruction'. Land Cleared for Build is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-16",
    type: "Reconstruction"
  },
  {
    coords: { lat: 34.04665718183822, lng: -118.53396460653666 },
    title: "Volunteers Needed!",
    body: "This location is currently marked as 'Business opening'. Volunteers Needed! is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-10",
    type: "Business opening"
  },
  {
    coords: { lat: 34.04295897778511, lng: -118.54804083944681 },
    title: "Home Restoration Update",
    body: "This location is currently marked as 'Safety Alert'. Home Restoration Update is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-10",
    type: "Safety Alert"
  },
  {
    coords: { lat: 34.06244385418746, lng: -118.53997275473002 },
    title: "Donation Drop-Off Here",
    body: "This location is currently marked as 'Fire Recovery'. Donation Drop-Off Here is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-25",
    type: "Fire Recovery"
  },
  {
    coords: { lat: 34.05749494865576, lng: -118.53836059570312 },
    title: "Local Cafe Reopens",
    body: "This location is currently marked as 'Safety Alert'. Local Cafe Reopens is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-10",
    type: "Business opening"
  },
  {
    coords: { lat: 34.04381242380436, lng: -118.57945487142923 },
    title: "Land Cleared for Build",
    body: "This location is currently marked as 'Safety Alert'. Land Cleared for Build is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-20",
    type: "Safety Alert"
  },
  {
    coords: { lat: 34.04597456183738, lng: -118.56496810913086 },
    title: "Grand Opening Today!",
    body: "This location is currently marked as 'Help Wanted'. Grand Opening Today! is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-19",
    type: "Community Event"
  },
  {
    coords: { lat: 34.055475325242696, lng: -118.56211707235697 },
    title: "Small Business Reopens",
    body: "This location is currently marked as 'Safety Alert'. Small Business Reopens is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-10",
    type: "Business opening"
  },
  {
    coords: { lat: 34.07211351647015, lng: -118.5447792732847 },
    title: "Grand Opening Today!",
    body: "This location is currently marked as 'Community Event'. Grand Opening Today! is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-26",
    type: "Community Event"
  },
  {
    coords: { lat: 34.08291948006904, lng: -118.54031607748392 },
    title: "Neighborhood Cleanup",
    body: "This location is currently marked as 'Fire Recovery'. Neighborhood Cleanup is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-21",
    type: "Fire Recovery"
  },
  {
    coords: { lat: 34.06926961270679, lng: -118.5337929451597 },
    title: "Land Cleared for Build",
    body: "This location is currently marked as 'Business opening'. Land Cleared for Build is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-03-01",
    type: "Construction Update"
  },
  {
    coords: { lat: 34.06087954042017, lng: -118.50701377035502 },
    title: "Residents Moving Back",
    body: "This location is currently marked as 'Help Wanted'. Residents Moving Back is actively happening here, with ongoing efforts to rebuild and restore the area.",
    date: "2025-02-16",
    type: "Reconstruction"
  }
];
const tempData = tempData1.map((item,id) => {
  let {  type } = item;
  return {
    id: id,
    image: getImage( id),
    icon:type === "Reconstruction"
    ? "🏗️"
    : type === "Help Wanted"
    ? "👷‍♂️"
    : type === "Community Event"
    ? "🎉"
    : type === "Business opening"
    ? "🏢"
    : type === "Construction Update"
    ? "🚧"
    : type === "Fire Recovery"
    ? " 🔥"
    : type === "Safety Alert"
    ? "⚠️"
    : "❓",
    ...item,
  };
});
  function getImage(i) {
    //there are 8 jfif images
    //7 jpg images 
    //2 webp images
    // each image is named with a number starting from 1
    let id=1+i
    return (id) <= 8
    ?"./mapImages/" + id + ".jfif"
    : id <= 15
    ? "./mapImages/" + (id-8) + ".jpg"
    : id <= 20
    ? "./mapImages/" + (id-15) + ".webp"
    :"./mapImages/1.jpg";

}
const center = {
  lat: 34.0621109620369,
  lng: -118.53594918784022,
};

// Component to handle click events on the map
const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();

  const handleClick = (event) => {
    const newCoord = { lat: event.detail.latLng.lat(), lng: event.detail.latLng.lng() };
    onMapClick(newCoord);
  };
  //   useEffect(() => {
  //     if (!map || !window.google) return;

  // console.log(map);
  //     map.addEventListener("click", handleClick);

  //     return () => {
  //       map.removeEventListener("click", handleClick);
  //     };
  //   }, [map, onMapClick]);

  return null;
};

const Map1 = ({ setSelectedLocation,selectedMarker, setSelectedMarker,itemData }) => {
  const [coords, setCoords] = useState(itemData);
  const mapRef = useRef(null);
  const handleMapClick = (newCoord) => {
    console.log("Clicked Location:", newCoord);
    let coordsM = newCoord.detail.latLng
    setCoords((prevCoords) => [...prevCoords, coordsM]);
    console.log("Clicked Location:", newCoord, coords, coordsM);
  };
  console.log(selectedMarker, setSelectedLocation, 'asdfasdf');

  const mapOptions = {
    styles: [
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0000ff" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "poi.sports_complex",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#000000" }],
      },
      {
        featureType: "administrative.province",
        elementType: "labels.text.fill",
        stylers: [{ color: "#000000" }],
      },
      
    ],
  };
  return (
    <APIProvider apiKey={API_KEY}
    >
      <Map
      //enable 'terrain' map type
       //   mapTypeId="terrain"
         
        mapTypeId="satellite"
      ref={mapRef}
        //set to size of container
        clickableIcons={false}
        // labels={false}
        onClick={()=>{
          setSelectedMarker(null);
          setSelectedLocation(null);
        }}
        colorScheme="DARK"
        //event that triggers on click when not dragged
        
        style={{ width: "100%", height: "100%" }}
        id="map"
        // mapTypeId="roadmap"
        // onClick={handleMapClick}
        defaultCenter={center}
        defaultZoom={13}
        //display zoom controls
        fullscreenControl={false}
        // display street view controls
        streetViewControl={false}
        zoomControl={true}
        // display map type controls
        mapTypeControl={true}
        // gestureHandling={"greedy"}
        // disableDefaultUI={true}
      >
        <MapClickHandler onMapClick={handleMapClick} />
        {coords.map((coord, index) => (
          <CustomMarker
            {...{ selectedMarker, setSelectedMarker, setSelectedLocation }}
            key={index}
            id={1+coord.id}
            data={coord}
            // markerPosition={coord}
            map={mapRef}
          // onClick={() => console.log("Marker clicked!", coord)}
          />
        ))}

      </Map>
    </APIProvider>
  );
};

let placeholder = `This location serves as a point of interest, offering a space for updates, contributions, and activity. Whether for informational purposes, ongoing developments, or general engagement, this entry provides relevant details for those interested.

Changes and updates may occur over time as new information becomes available. Various efforts, contributions, or modifications may shape how this location is utilized or perceived. Those involved can provide insights, share updates, or track progress as needed.

Visitors can find relevant details here and engage with any available content. Whether it’s general information, ongoing activity, or potential interactions, this entry is designed to provide a space for viewing and contributing updates.

Further details may be added as the situation evolves. Any participation, feedback, or contributions can help shape the direction of this location’s content and purpose over time.
`

function Details2({ selectedLocation ,setSelectedLocation ,itemData }) {
  // let data = tempData[selectedLocation];
  let data = itemData[selectedLocation];
  console.log("Details",data);
  return (
    <div className="details">
      {selectedLocation ? (
        <div>
          <h2>Selected Location: {data.title}</h2>
          <div

            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              maxWidth: "700px",
              height: "300px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          {/* <img 
            src={data.image}
            alt={data.title}
            style={{
              height: "auto",
              borderRadius: "8px",
            }}
          /> */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }} >
            <div style={{

            }}>
            <p>Type: {data.type}</p>
            <p>Date: {data.date}</p>
            <p> this is a placeholder page.   {data.body}</p>
            <p style={{ whiteSpace: "pre-line" }}
            >Body: {placeholder}</p>
            <p>Icon: {data.icon}</p>

            <p>Latitude: {data.coords.lat}</p>
            <p>Longitude: {data.coords.lng}</p>
            </div>
            </div>
        </div>
      ) : (
        <p>No location selected</p>
      )}
    </div>
  );
}
function Footer() {
  return (
    <div className="footer">
      <p>Footer Content</p>
    </div>
  );
}
function List({ selectedLocation, setSelectedLocation,setSelectedMarker,selectedMarker,filterBy, setFilterBy }) {
  let [sortBy, setSortBy] = useState("date");


  useEffect(() => {
    //scroll to selected item
    //selectedMarker === (1+index)
    if (selectedMarker !== null) {
      let element = document.getElementById(`list-item-${selectedMarker}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }
  , [selectedMarker]);
  return (
    <div className="list"
    style={{
      backgroundColor: "#222",
      color: "#fff",
      borderRadius: "8px",
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
    }}
    >
      {/* 
      mui select component
      to sort by:'date','title','type'
      */}
      <div className="list-header"
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        position: "sticky",
        top: 0,
        backgroundColor: "#222",
        color: "#fff",
        
        // border-bottom: 1px solid;
        borderBottom: "1px solid #fff2",
        paddingTop: "0px",
      }}
      >
      <div>
        
      <Select
        defaultValue="all"
        value={filterBy}
        onChange={(event) => {
          alert('not functional yet')
          setFilterBy(event.target.value);
        }}
        size="small"
        style={{
          marginRight: "20px",
          // width: "200px",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        <MenuItem value="all">View All</MenuItem>
        <MenuItem value="Reconstruction">Reconstruction</MenuItem>
        <MenuItem value="Help Wanted">Help Wanted</MenuItem>
        <MenuItem value="Community Event">Community Event</MenuItem>
        <MenuItem value="Business opening">Business opening</MenuItem>
        <MenuItem value="Construction Update">Construction Update</MenuItem>
        <MenuItem value="Fire Recovery">Fire Recovery</MenuItem>
        <MenuItem value="Safety Alert">Safety Alert</MenuItem>
      </Select>
      </div>
      <div> 
      <Select
        defaultValue="date"
        value={sortBy}
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
        size="small"
        style={{
            // marginLeft: "20px",
            // width: "200px",
          backgroundColor: "#333",
          color: "#fff", 
        }}
      >

        <MenuItem value="date">By Date</MenuItem>
        <MenuItem value="title">By Title</MenuItem>
        <MenuItem value="type">By Type</MenuItem>
      </Select>
      </div>
      </div>
      {tempData
      .sort((a, b) => {
        return sortBy === "date"
          ? new Date(b.date) - new Date(a.date)
          : sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.type.localeCompare(b.type);
      })
      .map((location, index) => (
        <>
        <div className="list-item"
        id={`list-item-${1+location.id}`}
          key={index}
          onClick={() => {
            setSelectedLocation(1+location.id);
            // setSelectedMarker(1+location.id)
          }}
          onMouseOver={() => {
            setSelectedMarker(1+location.id);
          }}
          style={{
            backgroundColor: selectedMarker === (1+location.id) ? "#555" : "#222",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            // color: "#fff",
          }}
        >
          <div className="image-container"
          style={{
            backgroundImage: `url(${location.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            minWidth: "100px",
            // height: "100px",
            // margin-right: 16px;
            margin: "0 16px",
            borderRadius: "8px",
          }}
          />
            <div className="list-item-content">
          <h3>
              
            {location.title}
            </h3>
          <p>{location.date}
              <Chip 
                label={
                <span style={{ fontSize: "1em" }}>
                  <span style={{ fontSize: "1.4em", marginRight: "4px" }}>
                  {location.icon} 
                  </span>
                  {location.type}
                  </span>}
                // variant="outlined"


                style={{
                  backgroundColor: "#444",
                  color: "#fff",
                  marginLeft: "8px",
                  fontSize: "0.8em",
                }}
              >

               {/* {location.icon} {location.type}  */}
              </Chip>
             
             </p>
          <p style={{ 
            //line clamp 2 lines with ellipses
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            
          }}
          >{location.body}</p>
          </div>
        </div>
      {/* { 
        selectedMarker === (1+location.id) &&
      <Button fullWidth 
      // no focus on mount
      // focusVisible={false}

          variant="outlined"
          >
           View Full Info
          </Button>} */}
          </>
      ))}
    </div>
  );
}

function Header({ selectedLocation ,setSelectedLocation }) {
  let data  = tempData.find((item) => 1+item.id === selectedLocation);
  return (
    <StyledHeader>
     { 
      selectedLocation !== null &&
      <IconButton
          onClick={() => {
            setSelectedLocation(null);
            window.location.hash = "";
          }}
          style={{
            color: "#fff",
            backgroundColor: "#444",
            marginRight: "16px",
          }}
        >
          <ArrowBackIcon />

        </IconButton>}
      <a className="title" href="/"
      style={{color: "#d18373", fontWeight: "400",marginRight: "8px"}}
      >
        Palisades Fire Recovery
      </a>
      {selectedLocation !== null && (
        <div className="title"> 
        {/* back button */}
        
          <div> / {data.title}</div> 
        </div>
      )}
      {/* materialUI hamburger icon */}
      <div className="links">
        
        <Link page="map" to="/map"/>
        <Link page="about" to="/about"/>
        <Link page="contact" to="/contact"/>
        <Link page="login" to="/login" icon="login"/>
        {/* <a href="#contact">Forum</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a> */}
      </div>
      {/* <IconButton 
        style={{
          color: "#fff",
          backgroundColor: "#444",
          borderRadius: "50%",
        }}
        onClick={() => {
          console.log("Hamburger icon clicked");
        }}
      >
        <MenuIcon />
      </IconButton> */}
    </StyledHeader>
  );
}
      
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 4px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  & .links {
    flex-grow: 1;
    padding-left: 45px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // border-left: 1px solid #fff2;
}
  & a{
    color: #fff;
    text-decoration: none;
  }
  `;

  function Link({ page, to,icon }) {
    return (
      <StyledLink onClick={() => {
        // setPage(page);
      }}
      className="link"
      href={to}>
        <Button
        //remove color from button
        variant="text"
        style={{
          fontSize: "1em",
          color: "#fff",
          padding: "4px 8px",
          backgroundColor: page === "login" ? "#555" : "transparent",
          borderRadius: page === "login" ? "25px" : "0",
          height: "40px",
          // margin: "0 8px",
        }}
        >
        {page}
        {page === "login" && <AccountCircleIcon fontSize="medium" style={{ marginLeft: "8px" }} />}
        </Button>
      </StyledLink>
    );
  }
  const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  // padding: 8px 16px;
  border-radius: 4px;
  margin: 0 8px;
  // height: 32px;
  
  &:hover {

    background-color: #444;
  }
  &.active {
    background-color: #444;
  }
  `;
function App() {
  let [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  let [filterBy, setFilterBy] = useState("all");
  let itemData = tempData.filter((item) => {
    if (filterBy === "all") return true;
    //broken
    return item.type === filterBy;
  } );
  //get current location hash
  //if hash is empty, simulate back button
  //check this on any change to location
  //like if back button is pressed
  let hash = window.location.hash;
  function simulatePageChange() {
    window.location.hash = ""
    setSelectedLocation(null);
    // window.location.reload();
  }
  let hashLocation = hash.replace("#", "");
  //if hash is not empty, set selectedLocation to hash
  useEffect(() => {
    if (hashLocation !== "") {
      // setSelectedLocation(hashLocation);
    } else {
      simulatePageChange();
      setSelectedLocation(null);
    }
  }, [hashLocation]);
  
  

  useEffect(() => {
    //if selectedLocation changes, set windows location hash to selectedLocation
    if (selectedLocation !== null) {
      window.location.hash = `#${selectedLocation}`;
    } else {
      window.location.hash = "";
    }
  }
  , [selectedLocation]);
  return (
    <Container 
     {...{
      selectedLocation,
      Header: <Header {...{ selectedLocation, setSelectedLocation }} />,
      Map: <Map1 {...{itemData, setSelectedLocation,selectedMarker, setSelectedMarker }} />,
      List: <List {...{itemData, selectedLocation,setSelectedLocation ,setSelectedMarker,selectedMarker,filterBy, setFilterBy}} />,
      Details: <Details {...{ selectedLocation,setSelectedLocation ,itemData }} />,
      Footer: <Footer />,

     }}
    >
        {/* <Map1
        {...{setSelectedLocation }}
        />
        <Details
          {...{ selectedLocation }}
        />
        <Footer /> */}
    </Container>
  );
}
function Container({ Map, Details, Footer,List,Header,selectedLocation }) {
  return (
    <StyledContainer>
      <div className="header-container">
        {Header}
      </div>

      <div className="horizontal-container"  style={{
        //if selectedLocation is not null, set padding to 0
        padding: selectedLocation !== null
        ? "0px" : "20px",
        }}>
        <div className="map-container">
          {Map}
        </div>
        <div className="list-container">
          {List}
        </div>
        
        <div className="overlay" style={{
          display: selectedLocation !== null
          ? "block" : "none",
        }}>
          <div className="details-container">
            {Details}
          </div>
        </div>
      </div>
      {/* <div className="footer-container">
        {Footer}
      </div> */}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  position: relative;
  background-color: #222;
  color: eee;
  & .details-container {
    overflow: hidden;
    background-color: #333;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 20px;
    box-sizing: border-box;
    position: relative;
}
  & .horizontal-container {
    box-sizing: border-box;
    // padding-top: 0;
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  & .list-container {
    flex: 1;
    background-color: #222;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    // padding: 0 12px;
    // margin-left: 20px;
    & .list {
      height: 100%; 
      cursor: pointer;
      color: #fff;
      }
      & .list-item {
        border-bottom: 1px solid #fff2;
      padding: 6px;
      margin: 2px 0;
      // background-color: #333;
      // border-radius: 8px;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: #333;
      }
    }
  }
  & .map-container {
    // padding-left: 20px;
    flex: 1.5;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  & .overlay {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100%;
    background-color:#333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
`;

export default App;
