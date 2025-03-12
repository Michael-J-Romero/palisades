import React, { useState, useEffect } from "react";
import { Pin,useMap,AdvancedMarker,Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { Dialog, DialogContent, Card, div, CardContent, Typography, Button } from "@mui/material";
import styled from "styled-components";

// const img2 =  "https://media.gettyimages.com/id/172132449/photo/construction-site-apartment-building-san-fernando-valley-california.jpg?s=612x612&w=gi&k=20&c=oE0mVdhIorqCBkK2cov5IWzbUke8-oFIKvhgaKAK-PQ=";

// const markerPosition = { lat: 34.0522, lng: -118.2437 };

const StyledInfoContainer = styled.div`
  max-width: 280px;
  width: 100%;
//   padding: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
//   animation: fadeScaleIn 0.3s ease forwards;
  
  @keyframes fadeScaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
    width: 100%;
    text-transform: none;
  }
`;

const FullScreenDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    height: 100%;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 1000;
  cursor: pointer;
`;

const MapWithInteractiveMarker = ({
    id,
    setSelectedMarker,selectedMarker,
    setSelectedLocation,// image:img2
    data,
}) => {
    console.log("MapWithInteractiveMarker",data)
    const{icon,coords:markerPosition,title,body,type,image:img2}=data
    // let img2=getImage(id)
//   use useMap() to get the map instance
    const map = useMap();
    // console.log(map)
  const [hoverMarker, setHoverMarker] = useState(false);

  const [iconUrl, setIconUrl] = useState(
    "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="red" stroke="black" stroke-width="2"/>
          <text x="5" y="28" font-size="28">💥</text>
          
        </svg>
      `)
  );
  
  useEffect(() => {
    if (hoverMarker) {
        setIconUrl(img2);
    } else {
      setTimeout(() => {
        setIconUrl(
          "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <circle cx="24" cy="24" r="24" fill="#0008" stroke="#111" stroke-width="4"/>
              <text 
                x="${type === "Fire Recovery"?   "8"  :'5'}"
                y="34" font-size="30"
               >
                <div>asdfasdf</div>
                  ${icon }
                </text>
              </svg>
            `)
        );
      }, 100);
    }
  }, [hoverMarker]);
  const handleClickOutside = () => {
    setSelectedMarker(null);
    // setDisableMapInteraction(false);
  };
  console.log("Selected Marker:", selectedMarker,'id:',id)
  const renderCustomPin = () => {
    return (
      <>
        <div className="custom-pin">
          <button className="close-button">
            <span className="material-symbols-outlined"> close </span>
          </button>

          <div className="image-container">
            asdffds
            <span className="icon">
asdffdsa
            </span>
          </div>
sdfasdf
        </div>

        <div className="tip" />
      </>
    );
  };
  return (
    <>
    {/* {selectedMarker && <Overlay onClick={handleClickOutside} />} */}
      <Marker
      className="marker" 
        position={markerPosition}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(hoverMarker ? 60 : 30, hoverMarker ? 60 : 30),
        }} 
        onMouseOver={() => setHoverMarker(true)}
        onMouseOut={() => setHoverMarker(false)}
        onClick={() => {
            // map.panTo(markerPosition);
            //hide all other markers
console.log(selectedMarker,id)
            setSelectedMarker(id)
        }}
      >
         {/* {renderCustomPin()} */}
         {/* <Pin
                  background={'#22ccff'}
                  borderColor={'#1e89a1'}
                  glyphColor={'#0f677a'}
                /> */}
        </Marker>

      {(selectedMarker==id)
      && (
        <InfoWindow position={markerPosition} 
        pixelOffset={[0, -36]}
        headerContent={
            <Typography variant="h6" style={{ fontSize: "1.2em",fontWeight: "bold" }}>
                {title}
            </Typography>
        }
        onCloseClick={handleClickOutside}>
          <StyledInfoContainer> 
            
            <div style={{ 
                width: "100%", 
                height: "150px", 
                backgroundImage: `url(${img2})`, backgroundSize: "cover", borderRadius: "4px",backgroundPosition: "center" }}/>
            <Typography variant="body2" color="textSecondary" style={{ 
                marginTop: "6px" ,
                // 3 lines clamp with ellipses
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                }}>
                {/* {body} */}
                posted: {data.date} <br/>
                7 comments <br/>
                28 likes
            </Typography>
            <StyledButton 
            //no auto focus
            autoFocus={false}
            variant="contained" color="primary" onClick={() => setSelectedLocation(id)}>
              View Full Info
            </StyledButton>
          </StyledInfoContainer>
        </InfoWindow>
      )} 
    </>
  );
};

export default MapWithInteractiveMarker;
