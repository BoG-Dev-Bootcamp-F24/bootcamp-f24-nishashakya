import express from "express"; 
import mongoose from "mongoose";
import cors from "cors"; 

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors()); 
app.use(express.json()); 

// Connection to MongoDB
mongoose.connect("mongodb+srv://nishashakya:SsBlFlBdsmmOBYLH@cluster0.vcbhg.mongodb.net/martaDB?retryWrites=true&w=majority"); // Replace with your actual connection string


const trainSchema = new mongoose.Schema({
    DESTINATION: { type: String, required: true },
    DIRECTION: { type: String, required: true },
    EVENT_TIME: { type: Date, required: true },
    HEAD_SIGN: { type: String, required: true },
    LINE: { type: String, required: true },
    NEXT_ARR: { type: Date, required: true },
    STATION: { type: String, required: true },
    TRAIN_ID: { type: String, required: true },
    WAITING_SECONDS: { type: Number, required: true },
    WAITING_TIME: { type: String, required: true },
    RESPONSETIMESTAMP: { type: Date, required: true },
    VEHICLELONGITUDE: { type: String, required: true },
    VEHICLELATITUDE: { type: String, required: true },
    DELAY: { type: String, required: true },
    TRIP_ID: { type: String, required: true },
});

const stationSchema = new mongoose.Schema({
    line: { 
      type: String, 
      required: true 
    },
    stations: { 
      type: [String],
      required: true 
    }
});


const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);


app.get("/api/trains", async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));