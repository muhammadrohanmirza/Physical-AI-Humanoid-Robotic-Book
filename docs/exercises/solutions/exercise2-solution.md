---
sidebar_label: 'Exercise 2.1 Solutions: Sensor Selection Challenge'
title: 'Exercise 2.1 Solutions: Sensor Selection Challenge'
description: 'Solutions for Exercise 2.1: Sensor Selection Challenge'
keywords: [sensors, sensor selection, solutions, Physical AI]
tags: [solutions, sensors, selection]
---


# Exercise 2.1 Solutions: Sensor Selection Challenge

## Part 1: Sensor Inventory

### 1. RGB Camera
- **What it measures**: Visual information (intensity, color) in the visible light spectrum
- **Advantages**: 
  - Provides rich visual information for object recognition
  - Can detect traffic lights, signs, and lane markings
  - Relatively low cost
  - Well-established technology with good software support
- **Limitations**:
  - Performance degrades in poor lighting conditions
  - Affected by weather (rain, fog, snow)
  - Struggles with glass and reflective surfaces

### 2. LiDAR (Light Detection and Ranging)
- **What it measures**: Distance to objects using laser pulses, creating 3D point clouds
- **Advantages**:
  - Provides accurate 3D spatial information
  - Works in various lighting conditions (day/night)
  - Can detect transparent obstacles that cameras miss
- **Limitations**:
  - Expensive compared to other sensors
  - Performance degrades in adverse weather (fog, heavy rain)
  - Lower resolution compared to cameras

### 3. Ultrasonic Sensors
- **What it measures**: Distance to objects using sound waves
- **Advantages**:
  - Effective for short-range obstacle detection
  - Relatively low cost
  - Works in various lighting conditions
  - Good for detecting nearby obstacles
- **Limitations**:
  - Limited range (typically 1-10 meters)
  - Affected by weather conditions (wind, temperature)
  - Lower accuracy than LiDAR
  - Limited field of view

### 4. IMU (Inertial Measurement Unit)
- **What it measures**: Acceleration, angular velocity, and orientation
- **Advantages**:
  - Provides continuous motion tracking
  - Works independently of external conditions
  - High-frequency measurements
  - Essential for stabilization
- **Limitations**:
  - Suffers from drift over time
  - Requires periodic recalibration
  - Does not provide absolute positioning

### 5. Wheel Encoders
- **What it measures**: Distance traveled based on wheel rotation
- **Advantages**:
  - Provides relative position information
  - Simple and reliable technology
  - Low cost
  - Works in all conditions
- **Limitations**:
  - Only provides relative, not absolute positioning
  - Affected by wheel slippage
  - Accumulates errors over time

## Part 2: Sensor Configuration

### Camera Configuration:
- **Quantity**: 4 cameras (front, rear, left, right) for 360° coverage
- **Mounting**: Positioned at the corners of the robot for maximum field of view with minimal blind spots
- **Rationale**: Multiple cameras provide redundancy and 360° awareness, essential for safe navigation
- **Cost Impact**: ~$400-800 total

### LiDAR Configuration:
- **Quantity**: 1 main LiDAR unit
- **Mounting**: Center-top of the robot for unobstructed 360° scanning
- **Rationale**: Central position provides comprehensive environmental mapping
- **Cost Impact**: ~$1,000-4,000 depending on quality

### Ultrasonic Configuration:
- **Quantity**: 8 sensors (2 per side) for close-proximity detection
- **Mounting**: Distributed around the base of the robot
- **Rationale**: Multiple sensors provide comprehensive short-range obstacle detection
- **Cost Impact**: ~$100-200 total

### IMU Configuration:
- **Quantity**: 1 high-quality IMU
- **Mounting**: Center of robot mass to minimize vibration effects
- **Rationale**: Central position provides most accurate motion tracking
- **Cost Impact**: ~$50-200

### Wheel Encoder Configuration:
- **Quantity**: 2 encoders (one per drive wheel)
- **Mounting**: Directly on wheel axles
- **Rationale**: Differential wheel encoders enable accurate odometry
- **Cost Impact**: ~$50-100 total

## Part 3: Fusion Strategy

### Complementary Sensors:
- **Cameras + LiDAR**: Cameras provide object classification, LiDAR provides accurate distances
- **IMU + Wheel Encoders**: IMU provides high-frequency motion data, encoders provide drift-corrected distance
- **LiDAR + Ultrasonic**: LiDAR for long range, ultrasonic for close-range precision

### Handling Failures:
- **Primary Navigation**: LiDAR-based SLAM (Simultaneous Localization and Mapping)
- **Fallback 1**: Camera-based visual odometry with IMU and wheel encoders
- **Fallback 2**: Pure IMU and wheel encoder navigation with ultrasonic obstacle avoidance
- **Emergency**: Stop and request human intervention

### Safety Measures:
- Continuous sensor health monitoring
- Redundant path planning using different sensor sets
- Emergency stop if too many sensors fail
- Safe zone navigation when sensor confidence is low

## Part 4: Environmental Considerations

### Daylight vs. Nighttime:
- Cameras: Use infrared illuminators for nighttime operation
- LiDAR: Performance remains consistent
- Overall: LiDAR provides primary navigation at night, cameras for object classification

### Weather Conditions:
- Rain/Snow: Ultrasonic sensors may be affected; rely more on LiDAR and protected cameras
- Fog: LiDAR range may be reduced; reduce speed, increase reliance on IMU and encoders
- Sunlight/Shadows: Camera auto-exposure adjusts; LiDAR unaffected

### Reflective Surfaces:
- Cameras may struggle with glass or mirrors
- LiDAR handles most reflective surfaces well
- Combined approach provides reliable detection

## Key Design Principles

1. **Redundancy**: Multiple sensors for critical functions
2. **Complementarity**: Different sensors provide different types of information
3. **Fail-Safe Operation**: Degraded functionality rather than complete failure
4. **Cost-Effectiveness**: Balance performance with budget constraints
5. **Maintenance**: Easy access for calibration and replacement

## Summary

The selected sensor suite provides comprehensive environmental awareness for the delivery robot. LiDAR serves as the primary navigation sensor due to its reliable 3D mapping capabilities, while cameras provide essential object classification. Ultrasonic sensors handle close-proximity detection, IMU provides motion tracking, and wheel encoders contribute to accurate positioning. This multi-sensor approach ensures robust operation across various conditions while maintaining safety through redundancy.