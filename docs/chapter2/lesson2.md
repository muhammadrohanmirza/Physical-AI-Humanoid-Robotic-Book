---
sidebar_label: 'Lesson 2.2: Data Processing and Filtering'
title: 'Lesson 2.2: Data Processing and Filtering'
description: 'Techniques for processing raw sensor data to extract meaningful information for Physical AI systems.'
keywords: [data processing, filtering, sensor data, noise reduction, Physical AI]
tags: [data processing, filtering, sensors]
---


# Lesson 2.2: Data Processing and Filtering

## Learning Objectives

After completing this lesson, you will be able to:
- Identify common sources of noise and errors in sensor data
- Apply basic filtering techniques to improve sensor data quality
- Understand the principles of signal processing for sensor data
- Implement simple data validation and outlier detection methods

## Introduction to Sensor Data Processing

Raw sensor data rarely provides perfect information. It contains noise, errors, and artifacts that must be processed to extract meaningful information for Physical AI systems. Effective data processing is crucial for reliable system operation.

## Sources of Sensor Data Problems

### Noise
Noise is random variation in sensor readings that doesn't represent the actual measured quantity:

**Types of Noise:**
- **White Noise**: Random noise with uniform frequency distribution
- **Pink Noise**: Noise with power density inversely proportional to frequency
- **Impulse Noise**: Sudden spikes in the data
- **Quantization Noise**: Errors due to digital representation of analog signals

### Drift
Gradual changes in sensor readings over time that don't reflect actual changes in the measured quantity:
- Temperature effects on sensor components
- Component aging
- Calibration degradation

### Bias
Systematic error that causes sensor readings to deviate consistently from the true value:
- Zero-point offset
- Scale factor errors
- Environmental effects (e.g., magnetic interference for compass)

### Outliers
Sensor readings that are significantly different from expected values:
- Caused by electromagnetic interference
- Sensor malfunctions
- Environmental anomalies

## Filtering Techniques

### Moving Average Filter
A simple filter that averages recent sensor readings:

```
filtered_value = (x[t] + x[t-1] + x[t-2] + ... + x[t-n+1]) / n
```

**Advantages:**
- Simple to implement
- Effective for reducing random noise
- Linear phase response

**Disadvantages:**
- Introduces delay in the signal
- May smooth out important rapid changes
- Equal weighting of all samples in the window

### Exponential Moving Average (EMA)
A filter that gives more weight to recent readings:

```
filtered_value = α * current_reading + (1 - α) * previous_filtered_value
```

Where α (alpha) is a smoothing factor between 0 and 1.

**Advantages:**
- Requires less memory than moving average
- Responds faster to changes
- Smooths noise effectively

**Disadvantages:**
- Still introduces some delay
- Requires tuning of the α parameter

Here's an implementation example:

```python
class ExponentialMovingAverage:
    def __init__(self, alpha=0.1):
        self.alpha = alpha
        self.filtered_value = None
    
    def update(self, new_value):
        if self.filtered_value is None:
            self.filtered_value = new_value
        else:
            self.filtered_value = (self.alpha * new_value + 
                                  (1 - self.alpha) * self.filtered_value)
        return self.filtered_value

# Example usage
ema_filter = ExponentialMovingAverage(alpha=0.3)
raw_readings = [10.2, 10.5, 10.3, 15.2, 10.4, 10.6, 10.3]  # Note: 15.2 is an outlier

for reading in raw_readings:
    filtered = ema_filter.update(reading)
    print(f"Raw: {reading:.1f}, Filtered: {filtered:.2f}")
```

### Kalman Filter
A more sophisticated filter that estimates the true state of a system based on noisy measurements:

```python
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

# Example usage
kf = SimpleKalmanFilter()
measurements = [10.2, 10.5, 10.3, 15.2, 10.4, 10.6, 10.3]  # Note: 15.2 is an outlier

for measurement in measurements:
    filtered = kf.update(measurement)
    print(f"Measurement: {measurement:.1f}, Kalman Filtered: {filtered:.2f}")
```

### Median Filter
Effective for removing impulse noise while preserving edges:

```python
def median_filter(readings, window_size=3):
    """
    Apply median filter to reduce impulse noise
    """
    if len(readings) < window_size:
        return readings
    
    filtered = []
    half_window = window_size // 2
    
    for i in range(len(readings)):
        # Determine the window boundaries
        start = max(0, i - half_window)
        end = min(len(readings), i + half_window + 1)
        
        # Extract the window and sort to find median
        window = sorted(readings[start:end])
        median = window[len(window) // 2]
        filtered.append(median)
    
    return filtered

# Example usage
raw_readings = [10.2, 10.5, 10.3, 15.2, 10.4, 10.6, 10.3]  # Note: 15.2 is an outlier
filtered_readings = median_filter(raw_readings, window_size=3)
print("Raw readings:     ", raw_readings)
print("Median filtered:  ", [round(x, 2) for x in filtered_readings])
```

## Data Validation Techniques

### Range Checking
Verify that sensor readings fall within expected ranges:

```python
def validate_temperature(reading, min_temp=-40, max_temp=85):
    """
    Validate temperature reading is within reasonable range
    """
    if reading < min_temp or reading > max_temp:
        return False, f"Temperature {reading}°C out of range [{min_temp}, {max_temp}]"
    return True, "Valid"
```

### Rate of Change Limiting
Check if sensor readings are changing too rapidly:

```python
class RateOfChangeValidator:
    def __init__(self, max_rate=1.0, time_unit="second"):
        self.max_rate = max_rate
        self.last_value = None
        self.last_time = None
    
    def validate(self, value, timestamp):
        if self.last_value is None:
            self.last_value = value
            self.last_time = timestamp
            return True, "Initial reading"
        
        time_diff = timestamp - self.last_time
        if time_diff > 0:
            rate_of_change = abs(value - self.last_value) / time_diff
            if rate_of_change > self.max_rate:
                return False, f"Rate of change {rate_of_change} exceeds limit {self.max_rate}"
        
        self.last_value = value
        self.last_time = timestamp
        return True, "Valid"
```

### Plausibility Checks
Compare sensor readings to other available information:

```python
def check_plausibility(acceleration_reading, velocity_reading, time_diff):
    """
    Check if acceleration is plausible given velocity changes
    """
    expected_acceleration = velocity_reading / time_diff if time_diff > 0 else 0
    tolerance = 0.5  # Allow 0.5 units of difference
    
    if abs(acceleration_reading - expected_acceleration) > tolerance:
        return False, f"Acceleration {acceleration_reading} inconsistent with velocity change"
    
    return True, "Plausible"
```

## Outlier Detection

### Statistical Methods
Using statistical properties to identify outliers:

```python
import numpy as np

def detect_outliers_std(data, threshold=2):
    """
    Detect outliers using standard deviation
    """
    mean = np.mean(data)
    std = np.std(data)
    
    outliers = []
    for i, value in enumerate(data):
        if abs(value - mean) > threshold * std:
            outliers.append((i, value))
    
    return outliers

def detect_outliers_iqr(data):
    """
    Detect outliers using Interquartile Range (IQR)
    """
    q75, q25 = np.percentile(data, [75, 25])
    iqr = q75 - q25
    
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    
    outliers = []
    for i, value in enumerate(data):
        if value < lower_bound or value > upper_bound:
            outliers.append((i, value))
    
    return outliers
```

## Practical Considerations

### Computational Complexity
Consider the computational requirements of your filtering approach:
- Simple filters (moving average) are computationally efficient
- Complex filters (Kalman) require more processing power
- Balance accuracy needs with computational constraints

### Real-Time Requirements
Many Physical AI systems have real-time constraints:
- Processing must complete within specific time windows
- Consider filter delay when making time-critical decisions
- Some applications may need multiple processing pipelines

### Memory Usage
Filters often require memory to store previous values:
- Moving average needs to store N previous readings
- Kalman filter requires storing state and covariance
- Consider memory constraints in embedded systems

## Hands-On Exercise

### Exercise: Implement a Sensor Fusion System
Create a system that processes data from multiple sensors measuring the same quantity:

1. Simulate readings from two temperature sensors with different noise characteristics
2. Implement a weighted average to combine the readings
3. Add outlier detection to filter out obviously erroneous readings
4. Compare the fused result with individual sensor readings

Consider:
1. How would you determine the optimal weights for each sensor?
2. What happens when one sensor fails?
3. How would you detect sensor failure?

## Summary

Effective sensor data processing is essential for reliable Physical AI systems. By understanding and applying appropriate filtering techniques, we can extract meaningful information from noisy sensor readings. The choice of processing technique should balance accuracy, computational requirements, and real-time constraints.

## Next Steps

In our next lesson, we'll explore sensor fusion techniques that combine data from multiple sensors to create a more complete and reliable understanding of the environment.

[Previous: Lesson 2.1 - Sensor Technologies and Types](./lesson1) | [Next: Lesson 2.3 - Sensor Fusion and Integration](./lesson3)