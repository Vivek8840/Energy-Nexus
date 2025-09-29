# Energy Nexus - Streamlit Deployment

A smart energy trading platform built with Streamlit for sustainable energy commerce.

## Features

### For Consumers (Energy Buyers):
- 🛒 **Buy Green Energy**: Purchase solar energy from local producers
- 📊 **Price Comparison**: Compare green energy vs grid prices
- 🏪 **Marketplace**: Browse available energy listings
- 📍 **Location-Based**: Personalized recommendations based on pincode
- 💰 **Cost Savings**: Save money while reducing carbon footprint

### For Prosumers (Solar Panel Owners):
- ⚡ **Real-time Monitoring**: Track energy generation and consumption
- 💰 **Earn Revenue**: Sell surplus solar energy to consumers
- 📊 **Analytics Dashboard**: Visualize energy data with interactive charts
- 🔋 **Battery Management**: Monitor battery charge levels
- 🌱 **Carbon Tracking**: Track environmental impact

## Technology Stack

- **Frontend**: Streamlit
- **Data Visualization**: Plotly
- **Data Processing**: Pandas, NumPy
- **Styling**: Custom CSS

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SIH_Project
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   streamlit run streamlit_app.py
   ```

4. **Access the app**:
   Open your browser and go to `http://localhost:8501`

## Usage

### Getting Started
1. The app starts with a demo login
2. Select your user type (Consumer or Prosumer)
3. Enter your pincode for location-based features
4. Explore the dashboard and marketplace

### Consumer Features
- View energy price comparisons
- Browse marketplace listings
- Purchase green energy credits
- Track potential savings

### Prosumer Features
- Monitor real-time energy generation
- View earnings from energy sales
- Analyze energy patterns with charts
- Manage surplus energy sales

## Key Components

### Location Service
- Pincode-based location detection
- Regional pricing variations
- Solar potential assessment
- Carbon intensity calculations

### Energy Analytics
- Real-time data generation simulation
- Interactive charts and graphs
- Historical data analysis
- Performance metrics

### Marketplace
- Dynamic seller listings
- Price discovery
- Distance-based recommendations
- Rating system

## Data Sources

The application uses mock data to simulate:
- Real-time energy generation/consumption
- Location-based pricing
- Marketplace transactions
- Carbon offset calculations

## Deployment

### Local Development
```bash
streamlit run streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

### Production Deployment
The app can be deployed on:
- Streamlit Cloud
- Heroku
- AWS EC2
- Google Cloud Run
- Any platform supporting Python applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team.

---

**Energy Nexus** - Connecting communities through sustainable energy trading ⚡🌱
