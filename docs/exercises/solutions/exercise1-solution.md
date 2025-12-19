---
sidebar_label: 'Exercise 1.1 Solutions'
title: 'Exercise 1.1 Solutions: Understanding Physical AI Systems'
description: 'Solutions for Exercise 1.1: Understanding Physical AI Systems'
keywords: [Physical AI systems, sensors, actuators, solutions]
tags: [solutions, analysis, components]
---


# Exercise 1.1 Solutions: Understanding Physical AI Systems

## Example 1: Smartphone Camera with Portrait Mode

**Sensors**:
- Main camera (RGB sensor)
- Depth sensor/ToF camera
- Accelerometer and gyroscope (for stabilization)
- Proximity sensor

**Actuators**:
- Camera lens focusing mechanism
- Flash
- Vibrator for haptic feedback
- Display for preview and interface

**Perception-Action Loop**:
- The system uses the main camera and depth sensor to perceive the scene
- AI algorithms analyze the image to distinguish between foreground subject and background
- The system then acts by blurring the background while keeping the subject in focus
- If motion is detected, the system adjusts stabilization parameters

**Key Challenge**:
The system must work in various lighting conditions and with different subjects, requiring robust algorithms that can accurately distinguish foreground from background in all scenarios.

## Example 2: Autonomous Vehicle (Tesla Autopilot)

**Sensors**:
- Multiple cameras (forward, side, rear)
- Ultrasonic sensors
- Radar
- GPS

**Actuators**:
- Steering control system
- Acceleration control
- Braking system

**Perception-Action Loop**:
- Sensors gather information about road, lane markings, other vehicles, pedestrians
- AI processes this information to understand the driving environment
- System decides on appropriate driving action (steer, accelerate, brake)
- Actions are executed via vehicle control systems

**Key Challenge**:
Safety requirements are extremely high as errors can have life-or-death consequences, requiring extremely reliable perception in all driving conditions.

## Example 3: Robotic Vacuum Cleaner

**Sensors**:
- Bump sensors
- Cliff sensors (to avoid falling down stairs)
- Dust sensors
- Navigation sensors (camera, laser, or other mapping technology)
- Wall-following sensors

**Actuators**:
- Drive wheels
- Main brush and side brushes
- Vacuum motor
- Charging contacts

**Perception-Action Loop**:
- Sensors detect obstacles, walls, stairs, and dirt
- AI determines navigation path and cleaning patterns
- Robot moves through space, cleans areas
- System updates map and adjusts strategy based on results

**Key Challenge**:
Operating in diverse home environments with varying layouts, obstacles, and floor types requires adaptable navigation and cleaning strategies.

## Key Learning Points

Physical AI systems share common characteristics:
- They integrate sensing of the physical environment with AI processing
- They affect the physical world through actuators
- They operate in real-time with safety and reliability concerns
- They must handle the uncertainty and variability of the physical world