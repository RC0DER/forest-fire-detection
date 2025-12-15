# Forest Fire Detection Dashboard

A real-time web dashboard for monitoring forest fire detection systems using live sensor data, fire location mapping, and instant alerts.

This dashboard visualizes data sent by IoT-based forest fire detection units and helps in early identification of fire incidents in remote or forested areas.

---

## 🔥 Key Features

- **Real-time sensor readings**
  - Temperature & humidity
  - Gas / smoke concentration
  - Flame detection status

- **Live fire alerts**
  - Instant alerts when sensor thresholds indicate fire risk
  - Clear visual warning indicators

- **Map-based fire location**
  - Displays detected fire locations using **Leaflet**
  - Uses GPS coordinates received from sensor nodes

- **Centralized monitoring**
  - All data streamed live via **Firebase**
  - Designed for remote monitoring with minimal human intervention

---

## 🧠 Tech Stack

- **Framework:** Vite
- **Frontend:** HTML, CSS, JavaScript
- **Map Library:** Leaflet.js
- **Database & Backend:** Firebase Realtime Database
- **IoT Hardware:** ESP32-based sensor node
- **Hosting (optional):** Firebase Hosting / GitHub Pages

---

## 📡 Sensor System Overview

The dashboard is designed to work with an **ESP32-based forest fire detection unit** equipped with the following sensors:

### Sensors Used

- **DHT22**
  - Measures temperature and humidity
  - Used to detect abnormal heat and dry conditions

- **MQ-2**
  - Detects smoke and combustible gases
  - Early indicator of fire or gas leakage

- **MQ-135**
  - Measures air quality
  - Helps identify environmental changes linked to fire

- **IR Flame Sensor**
  - Detects infrared radiation from flames
  - Confirms presence of open fire

- **GPS Module**
  - Provides latitude and longitude of detected fire
  - Used for real-time fire location on the map

### Sensor Data Flow

1. Sensors collect environmental data
2. ESP32 processes readings and checks thresholds
3. Data is sent to **Firebase Realtime Database**
4. Dashboard fetches data live from Firebase
5. Alerts and fire location are updated instantly

---

## 📡 Firebase Integration

Firebase is used for:
- Real-time sensor data streaming
- Fire alert triggering
- Storing GPS coordinates
- Synchronizing multiple sensor nodes

> **Note:** You must replace Firebase configuration keys with your own project credentials.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/RC0DER/forest-fire-detection.git
cd forest-fire-detection
```

### 2.Install dependencies
```bash
npm install
```

### 3. Configure Firebase
  -Create a Firebase project
  -Enable Realtime Database
  -Add your Firebase config in the project files

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in browse
  -Vite will provide a local URL (typically): http://localhost:5173

🗺 Dashboard Modules
  -Sensor Reading Panel
    Displays live values from all connected sensors
    
  -Map View
    Shows fire location using GPS coordinates
    
  -Alert System
    Highlights fire detection events in real time

  📂 Project Structure
    forest-fire-detection/
    ├── src/              # Application source code
    ├── index.html        # Entry point
    ├── package.json      # Dependencies and scripts
    ├── vite.config.js    # Vite configuration

🎯 Use Cases

  -Forest fire monitoring and early warning
  
  -Remote environmental surveillance
  
  -Smart forestry systems
  
  -Academic and IoT research projects

🔮 Future Improvements

  -Fire prediction system using ML
    Predict fire risk before ignition using historical sensor data
    Temperature, humidity, gas trends analysis
    
  -Historical data analytics dashboard
  
  -Multi-node sensor tracking
  
  -SMS / Email / App notification alerts
  
  -Role-based user access
  
  -Mobile-first dashboard UI

📜 License
  -This project is open-source and intended for educational, research, and experimental use.
