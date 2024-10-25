
# Real-Time Weather Monitoring and Analysis System

## Objective

This project implements a real-time data processing system designed to monitor and analyze weather conditions using data from the OpenWeatherMap API. The system continuously retrieves weather data for major metros in India, processes it to provide summarized daily insights, and triggers alerts based on user-defined thresholds. It also visualizes daily summaries, historical trends, and triggered alerts.

## Live demo
Link- https://youtu.be/TdEZC_FiNSM

## Features

1. **Continuous Real-Time Weather Monitoring**: 
   - Retrieves weather data from the OpenWeatherMap API for metro cities like Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
   - Runs at a configurable interval (e.g., every 5 minutes).

2. **Weather Data Processing**:
   - Converts temperature values from Kelvin to Celsius.
   - Supports user-preferred temperature units if configured.

3. **Daily Rollups and Aggregates**:
   - **Average Temperature**: Calculates the average temperature for each day.
   - **Maximum and Minimum Temperatures**: Captures daily maximum and minimum temperatures.
   - **Dominant Weather Condition**: The system identifies the primary weather condition by checking the frequency of conditions (e.g., clear, rain) across updates.

4. **Configurable Alert System**:
   - Triggers alerts when specific user-defined thresholds are breached, such as if the temperature exceeds 35°C for two consecutive updates.
   - Alerts can be displayed on the console or set up to send email notifications.

5. **Data Visualization**:
   - Displays daily weather summaries and triggered alerts.

## Technologies Used

- **React.js**: Front-end framework used to build the user interface and data visualizations.
- **OpenWeatherMap API**: Provides real-time weather data.
- **JavaScript (Node.js for scheduling and API requests)**: Handles API calls and data processing.
- **Tailwind Css**: Provides css to the structure.

## Setup Instructions

1. **Get the OpenWeatherMap API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) to obtain a free API key.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/RealTimeWeatherMonitoring.git
   cd RealTimeWeatherMonitoring
   ```

3. **Install Dependencies**:
   - Install project dependencies with:
     ```bash
     npm install
     ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```plaintext
     REACT_APP_WEATHER_API_KEY=your_openweather_api_key
     ```

5. **Run the Application**:
   ```bash
   npm start
   ```

## Functional Details

### 1. Data Retrieval and Processing
   - The app continuously retrieves weather data from the OpenWeatherMap API at the defined interval.
   - Temperature data is converted to Celsius (or another preferred unit).
   
### 2. Rollups and Aggregates
   - **Daily Aggregates**: Calculates daily average, max, min, and dominant weather conditions.
   - **Dominant Weather Condition**: Determined by the most frequent weather type within a day, providing a representative view of the day's condition.
   - These aggregates are stored for further analysis and visualization.

### 3. Threshold-Based Alerting System
   - Configurable thresholds let users set limits on temperature or other weather conditions.
   - Example: If temperature exceeds 35°C for two consecutive updates, an alert will be generated.
   - Alerts are displayed on the interface or can be configured to send email notifications.

### 4. Visualization
   - **Alerts**: A panel displaying triggered alerts with details.
