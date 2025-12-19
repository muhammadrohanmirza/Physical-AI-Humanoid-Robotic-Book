---
sidebar_label: 'Exercise 2.2: Filtering Algorithm Implementation'
title: 'Exercise 2.2: Filtering Algorithm Implementation'
description: 'Implement and compare different filtering algorithms for sensor data processing.'
keywords: [filtering, sensor data, algorithms, data processing, Physical AI]
tags: [exercise, filtering, algorithms]
---


# Exercise 2.2: Filtering Algorithm Implementation

## Objective

To implement and compare different filtering algorithms for processing noisy sensor data in Physical AI systems.

## Background

In this exercise, you'll work with simulated sensor data that contains various types of noise and artifacts. You'll implement different filtering algorithms and evaluate their effectiveness in different scenarios.

## Part 1: Data Simulation

First, create a function to generate realistic sensor data with different types of noise:

```python
import numpy as np
import matplotlib.pyplot as plt

def generate_noisy_sensor_data(length=100, base_value=10.0, noise_type="gaussian"):
    """
    Generate simulated sensor data with different types of noise
    """
    time = np.arange(length)
    
    # Base signal (could be constant, oscillating, etc.)
    base_signal = np.full(length, base_value)
    
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
    else:
        noise = np.zeros(length)
    
    return time, base_signal + noise

# Example usage:
time, noisy_data = generate_noisy_sensor_data(100, 10.0, "impulse")
```

## Part 2: Filter Implementation

Implement the following filtering algorithms:

### 1. Moving Average Filter
```python
def moving_average_filter(data, window_size=5):
    """
    Apply a moving average filter to the data
    """
    # Your implementation here
    pass
```

### 2. Exponential Moving Average Filter
```python
def exponential_moving_average_filter(data, alpha=0.1):
    """
    Apply an exponential moving average filter to the data
    """
    # Your implementation here
    pass
```

### 3. Median Filter
```python
def median_filter(data, window_size=3):
    """
    Apply a median filter to the data
    """
    # Your implementation here
    pass
```

### 4. Kalman Filter (simplified)
```python
class SimpleKalmanFilter:
    def __init__(self, initial_state=0, initial_uncertainty=1, 
                 process_noise=0.1, measurement_noise=0.1):
        # Your implementation here
        pass
    
    def update(self, measurement):
        # Your implementation here
        pass
```

## Part 3: Performance Evaluation

For each filter, evaluate its performance using:
1. **Mean Squared Error (MSE)**: How close is the filtered data to the true signal?
2. **Response Time**: How quickly does the filter respond to changes?
3. **Noise Reduction**: How effectively does it reduce noise?

## Part 4: Scenario Analysis

Test your filters on different types of noise:
1. Gaussian noise (random noise)
2. Impulse noise (sudden spikes)
3. Sensor drift (gradual change)
4. Periodic interference (oscillating noise)

## Deliverables

1. **Filter Implementations**: Complete Part 2 with working filter functions
2. **Evaluation Results**: Complete Part 3 with performance metrics
3. **Scenario Analysis**: Complete Part 4 with results for each noise type
4. **Recommendations**: Which filter is best for which scenario?
5. **Visualization**: Plots showing original data, noisy data, and filtered results

## Implementation Requirements

1. Implement all four filtering algorithms
2. Create a function to evaluate filter performance
3. Test filters on at least two different noise types
4. Create visualizations comparing the performance of different filters
5. Write a brief analysis of when to use each filter type

## Evaluation Criteria

- **Correctness**: Filters are implemented correctly and function as expected
- **Analysis**: Thorough evaluation of each filter's performance
- **Insight**: Understanding of when to apply each filter type
- **Visualization**: Clear plots showing filter effectiveness
- **Code Quality**: Clean, well-commented implementation

## Extension Challenge

Implement an adaptive filter that automatically adjusts its parameters based on the characteristics of the incoming data. The filter should detect when the noise properties change and adjust accordingly.

## Starter Code

```python
import numpy as np
import matplotlib.pyplot as plt

def generate_noisy_sensor_data(length=100, base_value=10.0, noise_type="gaussian"):
    """
    Generate simulated sensor data with different types of noise
    """
    time = np.arange(length)
    
    # Base signal (could be constant, oscillating, etc.)
    base_signal = np.full(length, base_value)
    
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
    else:
        noise = np.zeros(length)
    
    return time, base_signal + noise

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

# Example usage and visualization
if __name__ == "__main__":
    # Generate test data
    time, noisy_data = generate_noisy_sensor_data(100, 10.0, "impulse")
    true_signal = np.full(len(time), 10.0)  # The actual value should be 10.0
    
    # Apply filters
    ma_filtered = moving_average_filter(noisy_data, window_size=5)
    ema_filtered = exponential_moving_average_filter(noisy_data, alpha=0.3)
    med_filtered = median_filter(noisy_data, window_size=3)
    
    # Kalman filter
    kf = SimpleKalmanFilter()
    kf_filtered = []
    for measurement in noisy_data:
        kf_filtered.append(kf.update(measurement))
    
    # Plot results
    plt.figure(figsize=(12, 8))
    
    plt.subplot(2, 1, 1)
    plt.plot(time, true_signal, 'g-', label='True Signal', linewidth=2)
    plt.plot(time, noisy_data, 'r-', alpha=0.6, label='Noisy Data')
    plt.plot(time, ma_filtered, 'b--', label='Moving Average')
    plt.title('Filter Comparison - Impulse Noise')
    plt.legend()
    plt.grid(True)
    
    plt.subplot(2, 1, 2)
    plt.plot(time, true_signal, 'g-', label='True Signal', linewidth=2)
    plt.plot(time, noisy_data, 'r-', alpha=0.6, label='Noisy Data')
    plt.plot(time, ema_filtered, 'm--', label='Exp. Moving Average')
    plt.plot(time, med_filtered, 'c--', label='Median Filter')
    plt.plot(time, kf_filtered, 'y--', label='Kalman Filter')
    plt.legend()
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # Calculate MSE for each filter
    # Note: We need to account for different output lengths
    min_len = min(len(true_signal), len(ma_filtered))
    mse_ma = np.mean((true_signal[:min_len] - ma_filtered)**2)
    
    mse_ema = np.mean((true_signal - ema_filtered)**2)
    mse_med = np.mean((true_signal[:min_len] - med_filtered)**2)
    mse_kf = np.mean((true_signal - kf_filtered)**2)
    
    print(f"MSE - Moving Average: {mse_ma:.4f}")
    print(f"MSE - Exp. Moving Average: {mse_ema:.4f}")
    print(f"MSE - Median Filter: {mse_med:.4f}")
    print(f"MSE - Kalman Filter: {mse_kf:.4f}")
```

This starter code provides implementations of the filters and a basic evaluation framework. Your task is to complete the analysis and testing with different noise types, and provide recommendations based on your findings.