import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import random
import time

# Set page configuration
st.set_page_config(
    page_title="Energy Nexus - Smart Energy Trading Platform",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .prosumer-card {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .consumer-card {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .sidebar-header {
        font-size: 1.5rem;
        font-weight: bold;
        color: #1f77b4;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# Mock data and functions (simulating the backend)
def get_location_data(pincode):
    """Mock location service data"""
    locations = {
        '110001': {'city': 'Delhi', 'state': 'Delhi', 'district': 'Central Delhi', 'region': 'Northern India', 'solar_potential': 'medium', 'grid_price': 7.2, 'carbon_intensity': 0.85},
        '400001': {'city': 'Mumbai', 'state': 'Maharashtra', 'district': 'Mumbai City', 'region': 'Western India', 'solar_potential': 'high', 'grid_price': 8.1, 'carbon_intensity': 0.78},
        '560001': {'city': 'Bangalore', 'state': 'Karnataka', 'district': 'Bangalore Urban', 'region': 'Southern India', 'solar_potential': 'high', 'grid_price': 6.5, 'carbon_intensity': 0.65},
        '700001': {'city': 'Kolkata', 'state': 'West Bengal', 'district': 'Kolkata', 'region': 'Eastern India', 'solar_potential': 'medium', 'grid_price': 5.9, 'carbon_intensity': 0.72},
        '600001': {'city': 'Chennai', 'state': 'Tamil Nadu', 'district': 'Chennai', 'region': 'Southern India', 'solar_potential': 'high', 'grid_price': 6.8, 'carbon_intensity': 0.68},
    }
    return locations.get(pincode, {'city': 'Unknown', 'state': 'Unknown', 'district': 'Unknown', 'region': 'Unknown', 'solar_potential': 'medium', 'grid_price': 7.0, 'carbon_intensity': 0.75})

def generate_energy_data(hours=24):
    """Generate mock energy data"""
    base_time = datetime.now() - timedelta(hours=hours)
    data = []
    for i in range(hours):
        hour = base_time + timedelta(hours=i)
        # Simulate solar generation (peaks during day)
        hour_of_day = hour.hour
        solar_factor = max(0, np.sin(np.pi * (hour_of_day - 6) / 12)) if 6 <= hour_of_day <= 18 else 0
        generation = 8 * solar_factor * (0.8 + 0.4 * random.random())

        # Simulate consumption (varies throughout day)
        consumption = 3 + 2 * np.sin(np.pi * hour_of_day / 12) + random.uniform(-0.5, 0.5)

        data.append({
            'timestamp': hour,
            'generation': round(generation, 2),
            'consumption': round(consumption, 2),
            'surplus': round(max(0, generation - consumption), 2),
            'price': round(4.0 + random.uniform(-0.5, 0.5), 2)
        })
    return pd.DataFrame(data)

def get_marketplace_data(location_data):
    """Generate mock marketplace listings"""
    sellers = [
        f"{location_data['city']} Solar Co-op",
        f"{location_data['district']} Green Energy",
        "Regional Solar Farm",
        "EcoPower Solutions",
        "SunTech Energy"
    ]

    listings = []
    for i, seller in enumerate(sellers):
        listings.append({
            'seller': seller,
            'rating': round(4.5 + random.uniform(-0.5, 0.5), 1),
            'location': f"{location_data['city']}, {location_data['state']}",
            'amount': 20 + i * 5,
            'price_per_kwh': round(4.25 - i * 0.15, 2),
            'total_price': round((20 + i * 5) * (4.25 - i * 0.15), 2),
            'time_remaining': f"{2 + i % 3}h {random.randint(0, 59)}m",
            'distance': f"{2.5 + i * 0.7:.1f} km"
        })
    return listings

# Initialize session state
if 'user_type' not in st.session_state:
    st.session_state.user_type = 'consumer'
if 'pincode' not in st.session_state:
    st.session_state.pincode = '110001'
if 'is_logged_in' not in st.session_state:
    st.session_state.is_logged_in = True
if 'user_name' not in st.session_state:
    st.session_state.user_name = 'Demo User'

# Sidebar
with st.sidebar:
    st.markdown('<div class="sidebar-header">⚡ Energy Nexus</div>', unsafe_allow_html=True)

    if st.session_state.is_logged_in:
        st.write(f"Welcome, {st.session_state.user_name}!")

        user_type = st.selectbox(
            "Select User Type",
            ['consumer', 'prosumer'],
            index=0 if st.session_state.user_type == 'consumer' else 1
        )
        st.session_state.user_type = user_type

        pincode = st.text_input("Enter Pincode", value=st.session_state.pincode, max_chars=6)
        if pincode != st.session_state.pincode:
            st.session_state.pincode = pincode
            st.rerun()

        if st.button("Logout"):
            st.session_state.is_logged_in = False
            st.rerun()
    else:
        st.write("Please log in to continue")
        if st.button("Login (Demo)"):
            st.session_state.is_logged_in = True
            st.rerun()

# Main content
if not st.session_state.is_logged_in:
    st.markdown('<div class="main-header">Welcome to Energy Nexus</div>', unsafe_allow_html=True)
    st.write("Smart Energy Trading Platform for a Sustainable Future")
    st.write("Connect with local solar producers and trade clean energy!")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.info("🌱 **Go Green** - Purchase solar energy from local producers")
    with col2:
        st.info("💰 **Earn Money** - Sell your solar surplus to the community")
    with col3:
        st.info("📊 **Track Impact** - Monitor your carbon footprint reduction")
else:
    location_data = get_location_data(st.session_state.pincode)

    # Header
    st.markdown(f'<div class="main-header">Welcome back, {st.session_state.user_name.split()[0]}!</div>', unsafe_allow_html=True)

    if st.session_state.user_type == 'prosumer':
        # Prosumer Dashboard
        st.subheader("🏠 Prosumer Dashboard")

        # Real-time metrics
        energy_data = generate_energy_data(1).iloc[-1]  # Latest data

        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.markdown('<div class="prosumer-card">', unsafe_allow_html=True)
            st.metric("⚡ Generation", f"{energy_data['generation']:.1f} kWh", "Today")
            st.markdown('</div>', unsafe_allow_html=True)

        with col2:
            st.markdown('<div class="prosumer-card">', unsafe_allow_html=True)
            earnings = energy_data['surplus'] * energy_data['price'] * 0.8  # 80% of surplus sold
            st.metric("💰 Earnings", f"₹{earnings:.0f}", "Today")
            st.markdown('</div>', unsafe_allow_html=True)

        with col3:
            st.markdown('<div class="prosumer-card">', unsafe_allow_html=True)
            st.metric("🔋 Battery", "85%", "Charge Level")
            st.markdown('</div>', unsafe_allow_html=True)

        with col4:
            st.markdown('<div class="prosumer-card">', unsafe_allow_html=True)
            carbon_offset = energy_data['generation'] * 0.5
            st.metric("🌱 Carbon Offset", f"{carbon_offset:.1f} kg", "Today")
            st.markdown('</div>', unsafe_allow_html=True)

        # Charts
        st.subheader("📊 Energy Analytics")

        # Generate hourly data for charts
        hourly_data = generate_energy_data(24)

        col1, col2 = st.columns(2)

        with col1:
            fig = go.Figure()
            fig.add_trace(go.Scatter(x=hourly_data['timestamp'], y=hourly_data['generation'],
                                   mode='lines', name='Generation', line=dict(color='#FFD700')))
            fig.add_trace(go.Scatter(x=hourly_data['timestamp'], y=hourly_data['consumption'],
                                   mode='lines', name='Consumption', line=dict(color='#FF6B6B')))
            fig.update_layout(title='Energy Generation vs Consumption (24h)',
                            xaxis_title='Time', yaxis_title='kWh')
            st.plotly_chart(fig, use_container_width=True)

        with col2:
            fig = go.Figure()
            fig.add_trace(go.Bar(x=hourly_data['timestamp'], y=hourly_data['surplus'],
                               name='Surplus Energy', marker_color='#4ECDC4'))
            fig.update_layout(title='Available Surplus Energy',
                            xaxis_title='Time', yaxis_title='kWh')
            st.plotly_chart(fig, use_container_width=True)

        # Quick Actions
        st.subheader("⚡ Quick Actions")
        col1, col2 = st.columns(2)

        with col1:
            if st.button("🔄 Sell Surplus Energy", use_container_width=True):
                st.success(f"Surplus energy ({energy_data['surplus']:.1f} kWh) listed for sale!")

        with col2:
            if st.button("📊 View Detailed Analytics", use_container_width=True):
                st.info("Detailed analytics feature coming soon!")

    else:
        # Consumer Dashboard
        st.subheader("🏪 Consumer Dashboard")

        # Energy price comparison
        col1, col2, col3 = st.columns(3)

        with col1:
            st.markdown('<div class="consumer-card">', unsafe_allow_html=True)
            st.metric("🌱 Green Energy", f"₹{4.25:.2f}/kWh", "25% cleaner")
            st.markdown('</div>', unsafe_allow_html=True)

        with col2:
            st.markdown('<div class="consumer-card">', unsafe_allow_html=True)
            st.metric("🏭 Grid Price", f"₹{location_data['grid_price']:.2f}/kWh", "Higher carbon")
            st.markdown('</div>', unsafe_allow_html=True)

        with col3:
            st.markdown('<div class="consumer-card">', unsafe_allow_html=True)
            savings = location_data['grid_price'] - 4.25
            st.metric("💰 Potential Savings", f"₹{savings:.2f}/kWh", "Go green!")
            st.markdown('</div>', unsafe_allow_html=True)

        # Buy Green Energy Section
        st.subheader("🛒 Buy Green Energy")

        col1, col2 = st.columns([2, 1])

        with col1:
            st.write("**Purchase clean solar energy from local producers**")
            buy_amount = st.slider("Select Energy Amount (kWh)", 1, 50, 10)

            if buy_amount:
                total_cost = buy_amount * 4.25
                carbon_offset = buy_amount * 0.5

                st.info(f"""
                **Order Summary:**
                - Energy Amount: {buy_amount} kWh
                - Price per kWh: ₹4.25
                - CO2 Offset: {carbon_offset:.1f} kg
                - **Total Cost: ₹{total_cost:.2f}**
                """)

                if st.button("🛒 Buy Now", use_container_width=True):
                    st.success(f"Order placed successfully! You'll save ₹{(location_data['grid_price'] - 4.25) * buy_amount:.2f} compared to grid price.")

        with col2:
            st.write("**Benefits:**")
            st.markdown("""
            - ✅ 100% Solar Energy
            - ✅ Support Local Producers
            - ✅ Reduce Carbon Footprint
            - ✅ Save on Electricity Bills
            """)

        # Marketplace
        st.subheader("🏪 Energy Marketplace")

        marketplace_data = get_marketplace_data(location_data)
        for listing in marketplace_data:
            with st.container():
                col1, col2, col3, col4, col5 = st.columns([2, 1, 1, 1, 1])

                with col1:
                    st.write(f"**{listing['seller']}** ⭐ {listing['rating']}")
                    st.caption(f"📍 {listing['location']}")

                with col2:
                    st.metric("Energy", f"{listing['amount']} kWh")

                with col3:
                    st.metric("Price/kWh", f"₹{listing['price_per_kwh']}")

                with col4:
                    st.metric("Total", f"₹{listing['total_price']}")

                with col5:
                    if st.button(f"Buy", key=f"buy_{listing['seller']}"):
                        st.success(f"Purchase initiated for {listing['amount']} kWh from {listing['seller']}!")

                st.divider()

        # Educational Content
        st.subheader("🌱 Why Choose Solar Energy?")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.info("**Environmental Impact**\n\nReduce your carbon footprint by up to 80%")

        with col2:
            st.info("**Cost Savings**\n\nSave 20-40% on your electricity bills")

        with col3:
            st.info("**Energy Independence**\n\nGenerate your own clean energy")

# Footer
st.markdown("---")
st.markdown("**Energy Nexus** - Connecting communities through sustainable energy trading ⚡🌱")
st.caption("Built with ❤️ for a greener future")
