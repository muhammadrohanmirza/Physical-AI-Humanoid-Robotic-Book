---
sidebar_label: 'Exercise 2.2 Solutions: Filtering Algorithm Implementation'
title: 'Exercise 2.2 Solutions: Filtering Algorithm Implementation'
description: 'Solutions for Exercise 2.2: Filtering Algorithm Implementation'
keywords: [filtering, sensor data, algorithms, solutions, Physical AI]
tags: [solutions, filtering, algorithms]
---


# Exercise 2.2 Solutions: Filtering Algorithm Implementation

## Part 1: Data Simulation

The provided starter code generates realistic sensor data with different types of noise. Here's an enhanced version that includes more noise types:

```python
import numpy as np
import matplotlib.pyplot as plt

def generate_noisy_sensor_data(length=100, base_value=10.0, noise_type="gaussian", drift_rate=0.0):
    """
    Generate simulated sensor data with different types of noise
    """
    time = np.arange(length)
    
    # Base signal with optional drift
    base_signal = np.full(length, base_value) + drift_rate * time
    
    # Add a slowly changing component to make it more realistic
    base_signal += 0.5 * np.sin(0.1 * time)
    
    if noise_type == "gaussian":
        # Gaussian (white) noise
        noise = np.random.normal(0, 0.5, length)
    elif noise_type == "impulse":
        # Impulse (salt-and-pepper) noise
        noise = np.random.normal(0, 0.2, length)
        # Add occasional large spikes
        impulse_indices = np.random.choice(length, size=int(length*0.05), replace=False)
        noise[impulse_indices] += np.random.choice([-3, 3], size=len(impulse_indices))
    elif noise_type == "drift":
        # Simulate sensor drift over time
        drift = np.linspace(0, 2, length)  # 2 unit drift over time
        noise = np.random.normal(0, 0.3, length) + drift
    elif noise_type == "periodic":
        # Periodic interference
        periodic = 0.8 * np.sin(0.2 * time)
        noise = np.random.normal(0, 0.2, length) + periodic
    elif noise_type == "mixed":
        # Combination of different noise types
        gaussian_noise = np.random.normal(0, 0.3, length)
        periodic_noise = 0.3 * np.sin(0.2 * time)
        # Add some impulse noise
        impulse_indices = np.random.choice(length, size=int(length*0.02), replace=False)
        impulse_noise = np.zeros(length)
        impulse_noise[impulse_indices] = np.random.choice([-1.5, 1.5], size=len(impulse_indices))
        noise = gaussian_noise + periodic_noise + impulse_noise
    else:
        noise = np.zeros(length)
    
    return time, base_signal + noise
```

## Part 2: Filter Implementation

Here are the implementations of the required filters:

```python
import numpy as np
import matplotlib.pyplot as plt

def moving_average_filter(data, window_size=5):
    """
    Apply a moving average filter to the data
    """
    # Pad the data to handle boundaries
    padded_data = np.pad(data, (window_size//2, window_size-1-window_size//2), mode='edge')
    # Apply convolution with uniform kernel
    kernel = np.ones(window_size) / window_size
    filtered = np.convolve(padded_data, kernel, mode='valid')
    return filtered

def exponential_moving_average_filter(data, alpha=0.1):
    """
    Apply an exponential moving average filter to the data
    """
    filtered = np.zeros_like(data)
    filtered[0] = data[0]
    
    for i in range(1, len(data)):
        filtered[i] = alpha * data[i] + (1 - alpha) * filtered[i-1]
    
    return filtered

def median_filter(data, window_size=3):
    """
    Apply a median filter to the data
    """
    filtered = np.zeros_like(data)
    half_window = window_size // 2
    
    for i in range(len(data)):
        start = max(0, i - half_window)
        end = min(len(data), i + half_window + 1)
        filtered[i] = np.median(data[start:end])
    
    return filtered

class SimpleKalmanFilter:
    def __init__(self, initial_state=0, initial_uncertainty=1, 
                 process_noise=0.1, measurement_noise=0.1):
        self.state = initial_state
        self.uncertainty = initial_uncertainty
        self.process_noise = process_noise
        self.measurement_noise = measurement_noise
    
    def update(self, measurement):
        # Prediction step
        prediction_uncertainty = self.uncertainty + self.process_noise
        
        # Update step
        kalman_gain = prediction_uncertainty / (prediction_uncertainty + self.measurement_noise)
        self.state = self.state + kalman_gain * (measurement - self.state)
        self.uncertainty = (1 - kalman_gain) * prediction_uncertainty
        
        return self.state
```

## Part 3: Performance Evaluation

Here's a function to evaluate the performance of different filters:

```python
def evaluate_filter_performance(original_signal, filtered_signal, time_axis=None):
    """
    Evaluate the performance of a filter
    """
    if time_axis is None:
        time_axis = np.arange(len(original_signal))
    
    # Calculate Mean Squared Error
    mse = np.mean((original_signal - filtered_signal)**2)
    
    # Calculate Root Mean Squared Error
    rmse = np.sqrt(mse)
    
    # Calculate Mean Absolute Error
    mae = np.mean(np.abs(original_signal - filtered_signal))
    
    # Calculate Peak Signal-to-Noise Ratio (PSNR)
    max_val = np.max(np.abs(original_signal))
    if mse == 0:
        psnr = float('inf')  # Perfect reconstruction
    else:
        psnr = 20 * np.log10(max_val / np.sqrt(mse))
    
    return {
        'MSE': mse,
        'RMSE': rmse,
        'MAE': mae,
        'PSNR': psnr
    }
```

## Part 4: Scenario Analysis

Complete analysis of filters on different noise types:

```python
def compare_filters_on_noise_types():
    """
    Compare different filters on various noise types
    """
    # Define the noise types to test
    noise_types = ["gaussian", "impulse", "drift", "periodic", "mixed"]
    
    # Create subplots for visualization
    fig, axes = plt.subplots(len(noise_types), 2, figsize=(15, 3*len(noise_types)))
    
    for idx, noise_type in enumerate(noise_types):
        # Generate test data
        time, noisy_data = generate_noisy_sensor_data(100, 10.0, noise_type)
        true_signal = np.full(len(time), 10.0) + 0.5 * np.sin(0.1 * time)  # Include the base signal
        
        # Apply filters
        ma_filtered = moving_average_filter(noisy_data, window_size=5)
        ema_filtered = exponential_moving_average_filter(noisy_data, alpha=0.3)
        med_filtered = median_filter(noisy_data, window_size=3)
        
        # Kalman filter
        kf = SimpleKalmanFilter()
        kf_filtered = []
        for measurement in noisy_data:
            kf_filtered.append(kf.update(measurement))
        kf_filtered = np.array(kf_filtered)
        
        # Plot results
        axes[idx, 0].plot(time, true_signal, 'g-', label='True Signal', linewidth=2)
        axes[idx, 0].plot(time, noisy_data, 'r-', alpha=0.6, label='Noisy Data')
        axes[idx, 0].plot(time, ma_filtered, 'b--', label='Moving Average')
        axes[idx, 0].set_title(f'{noise_type.capitalize()} Noise - Signal & MA Filter')
        axes[idx, 0].legend()
        axes[idx, 0].grid(True)
        
        axes[idx, 1].plot(time, true_signal, 'g-', label='True Signal', linewidth=2)
        axes[idx, 1].plot(time, ema_filtered, 'm--', label='Exp. Moving Average')
        axes[idx, 1].plot(time, med_filtered, 'c--', label='Median Filter')
        axes[idx, 1].plot(time, kf_filtered, 'y--', label='Kalman Filter')
        axes[idx, 1].set_title(f'{noise_type.capitalize()} Noise - Other Filters')
        axes[idx, 1].legend()
        axes[idx, 1].grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # Calculate performance metrics
    results = {}
    for noise_type in noise_types:
        time, noisy_data = generate_noisy_sensor_data(100, 10.0, noise_type)
        true_signal = np.full(len(time), 10.0) + 0.5 * np.sin(0.1 * time)
        
        # Apply filters
        ma_filtered = moving_average_filter(noisy_data, window_size=5)
        ema_filtered = exponential_moving_average_filter(noisy_data, alpha=0.3)
        med_filtered = median_filter(noisy_data, window_size=3)
        
        # Kalman filter
        kf = SimpleKalmanFilter()
        kf_filtered = []
        for measurement in noisy_data:
            kf_filtered.append(kf.update(measurement))
        kf_filtered = np.array(kf_filtered)
        
        # Evaluate performance
        results[noise_type] = {
            'Moving Average': evaluate_filter_performance(true_signal[:len(ma_filtered)], ma_filtered),
            'Exp. Moving Average': evaluate_filter_performance(true_signal, ema_filtered),
            'Median Filter': evaluate_filter_performance(true_signal[:len(med_filtered)], med_filtered),
            'Kalman Filter': evaluate_filter_performance(true_signal, kf_filtered)
        }
    
    return results

# Run the comparison
results = compare_filters_on_noise_types()

# Print the results in a formatted table
print("Filter Performance Comparison Across Noise Types:")
print("="*70)
for noise_type, metrics in results.items():
    print(f"\n{noise_type.upper()} NOISE:")
    print("-" * 30)
    print(f"{'Filter':<20} {'MSE':<10} {'RMSE':<10} {'MAE':<10} {'PSNR':<10}")
    print("-" * 60)
    for filter_name, values in metrics.items():
        print(f"{filter_name:<20} {values['MSE']:<10.4f} {values['RMSE']:<10.4f} {values['MAE']:<10.4f} {values['PSNR']:<10.2f}")
```

## Recommendations

Based on the analysis:

### For Gaussian Noise:
- **Kalman Filter** typically performs best as it's designed for Gaussian noise
- **Moving Average** is simple and effective for low-noise scenarios
- **Exponential Moving Average** provides a good balance of performance and computational efficiency

### For Impulse Noise (Sudden Spikes):
- **Median Filter** is most effective as it removes outliers
- **Moving Average** performs poorly as it spreads the spike to neighboring points
- **Kalman Filter** can work well with proper parameter tuning

### For Drift:
- **Exponential Moving Average** with a low alpha value can track gradual changes
- **Kalman Filter** can be adapted to model the drift as part of the system state
- **Moving Average** may not handle drift well if the window is too long

### For Periodic Interference:
- **Moving Average** can smooth out periodic noise if the window size is properly chosen
- **Kalman Filter** can be designed to handle periodic disturbances
- **Median Filter** may not be as effective for this type of noise

### For Mixed Noise:
- **Kalman Filter** is often the most robust as it can be tuned to handle various noise characteristics
- **Adaptive filters** that change parameters based on noise characteristics perform best
- **Combinations** of filters (e.g., median filter followed by Kalman filter) can be effective

## Key Insights

1. **No single filter is optimal for all noise types** - selection depends on the specific characteristics of the noise in your application.

2. **Median filters** are excellent for removing outliers but may distort the signal if the noise is not impulsive.

3. **Moving average filters** are simple but introduce lag and may not be suitable for signals with rapid changes.

4. **Kalman filters** require more understanding to implement correctly but often provide the best results when properly tuned.

5. **Exponential moving average** provides a good compromise between simplicity and performance for many applications.

## Extension Challenge Solution

Here's a simplified adaptive filter implementation:

```python
class AdaptiveFilter:
    """
    An adaptive filter that adjusts its parameters based on the characteristics of the input signal
    """
    def __init__(self, initial_alpha=0.1, min_alpha=0.01, max_alpha=0.5):
        self.ema_filter = exponential_moving_average_filter
        self.alpha = initial_alpha
        self.min_alpha = min_alpha
        self.max_alpha = max_alpha
        self.previous_values = []
        self.window_size = 10  # For calculating signal statistics
    
    def update(self, new_value):
        # Store recent values
        self.previous_values.append(new_value)
        if len(self.previous_values) > self.window_size:
            self.previous_values.pop(0)
        
        # Calculate statistics on recent values
        if len(self.previous_values) >= 2:
            # Calculate variance to detect high-frequency noise
            variance = np.var(self.previous_values)
            
            # Calculate rate of change to detect rapid changes
            recent_changes = [abs(self.previous_values[i] - self.previous_values[i-1]) 
                             for i in range(1, len(self.previous_values))]
            avg_change = np.mean(recent_changes)
            
            # Adjust alpha based on noise level and signal dynamics
            if variance > 1.0:  # High noise
                self.alpha = min(self.max_alpha, self.alpha + 0.01)
            elif avg_change > 0.5:  # Rapid changes
                self.alpha = min(self.max_alpha, self.alpha + 0.02)  # Respond faster
            else:  # Stable signal
                self.alpha = max(self.min_alpha, self.alpha - 0.01)  # Smooth more
        
        # Apply filter with current alpha
        if not hasattr(self, 'filtered_value'):
            self.filtered_value = new_value
        else:
            self.filtered_value = (self.alpha * new_value + 
                                  (1 - self.alpha) * self.filtered_value)
        
        return self.filtered_value
```

This adaptive filter adjusts its smoothing parameter based on the noise level and rate of change in the input signal, providing better performance across varying conditions.