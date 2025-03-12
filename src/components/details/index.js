import { Card, CardContent, CardMedia, Typography, Box, Button, Divider, IconButton, Grid, Paper, List, ListItem, ListItemText, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

let placeholder = `This location serves as a point of interest, offering a space for updates, contributions, and activity. Whether for informational purposes, ongoing developments, or general engagement, this entry provides relevant details for those interested.

Changes and updates may occur over time as new information becomes available. Various efforts, contributions, or modifications may shape how this location is utilized or perceived. Those involved can provide insights, share updates, or track progress as needed.

Visitors can find relevant details here and engage with any available content. Whether it’s general information, ongoing activity, or potential interactions, this entry is designed to provide a space for viewing and contributing updates.

Further details may be added as the situation evolves. Any participation, feedback, or contributions can help shape the direction of this location’s content and purpose over time.
`

// Mockup Comments
const mockComments = [
  { name: "Emily Carter", date: "March 5, 2025", body: "This project is really coming together! Excited to see the progress." },
  { name: "James Miller", date: "March 4, 2025", body: "Does anyone know if volunteers are needed here?" },
  { name: "Sophia Lee", date: "March 2, 2025", body: "Looking great! Thanks to everyone involved in the restoration." },
  { name: "Daniel Smith", date: "March 1, 2025", body: "I visited yesterday—things are moving fast!" },
    { name: "Olivia Brown", date: "February 28, 2025", body: "Can’t wait to see the final result! This place has so much potential." },
    { name: "Liam Johnson", date: "February 27, 2025", body: "Is there a timeline for completion? I’m curious about the next steps." },
    { name: "Ava Wilson", date: "February 26, 2025", body: "Great work everyone! This is going to be a fantastic addition to the area." },
    { name: "Noah Davis", date: "February 25, 2025", body: "I love the design! It’s going to be a beautiful space." },
    { name: "Mia Martinez", date: "February 24, 2025", body: "I heard there are plans for community events here. Exciting!" },
    { name: "Lucas Garcia", date: "February 23, 2025", body: "This is a great initiative! Looking forward to seeing it completed." },
    { name: "Charlotte Rodriguez", date: "February 22, 2025", body: "I’m impressed with the progress so far. Keep up the good work!" },
];

function Details({ selectedLocation, setSelectedLocation, itemData }) {
  if (!selectedLocation) {
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>No location selected</Typography>;
  }

//   const data = itemData[selectedLocation];
const data = itemData.find(item => 1+item.id === selectedLocation);

  return (
    <Box sx={{ width: "100vw", height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER: Stays Fixed at the Top */}

      {/* MAIN CONTENT & COMMENTS WRAPPER */}
      <Grid container sx={{ flex: 1, height: "calc(100vh - 70px)" }}>
        
        {/* LEFT: Main Details (Independent Scroll) */}
        <Grid item xs={12} md={7} lg={6} sx={{  overflowY: "auto",height: "100%"}}>
          <Card sx={{  width: "100%" }}>
      {/* <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "16px 32px", 
          backgroundColor: "#111", 
          color: "white", 
          position: "sticky", 
          top: 0, 
          zIndex: 1000
        }}
      >
        <IconButton onClick={() => setSelectedLocation(null)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box> */}
            {/* Image */}
            <CardMedia 
              component="img"
              height="400"
              image={data.image}
              alt={data.title}
              sx={{ objectFit: "cover" }}
            />

            <CardContent>
              {/* Type & Date */}
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Type:</strong> {data.type}
                  {data.icon && (
                  data.icon
              )}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Date:</strong> {data.date}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Description */}
              
        <Typography variant="h5" fontWeight="bold">
          {data.title}
        </Typography>
              <Typography variant="body2" color="text.primary" sx={{ whiteSpace: "pre-line" }}>
                {data.body}
                {placeholder}
              </Typography>

               

              {/* Coordinates */}
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Latitude:</strong> {data.coords.lat}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Longitude:</strong> {data.coords.lng}
                </Typography>
              </Box>

              {/* Close Button */}
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 3, width: "100%" }}
                onClick={() => setSelectedLocation(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT: Comments Section (Independent Scroll) */}
        <Grid item xs={12} md={5} lg={6} sx={{ padding: "24px", backgroundColor: "#f5f5f5", overflowY: "auto" ,height: "100%" }}>
          <Paper sx={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Comments
            </Typography>
            
            {/* Comments List */}
            <List>
              {mockComments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: "#1976d2", marginRight: 2 }}>{comment.name[0]}</Avatar>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" color="text.secondary">
                          {comment.date}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: "4px" }}>
                          {comment.body}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Details;
