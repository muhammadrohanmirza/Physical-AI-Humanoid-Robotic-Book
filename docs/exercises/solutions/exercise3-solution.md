---
sidebar_label: 'Exercise 1.3 Solutions: Control System Design'
title: 'Exercise 1.3 Solutions: Control System Design'
description: 'Solutions for Exercise 1.3: Control System Design'
keywords: [control systems, actuators, PID control, solutions, Physical AI]
tags: [solutions, control, design, safety]
---


# Exercise 1.3 Solutions: Control System Design - Automated Window System

## Part 1: System Requirements

**Desired behaviors**:
- Open window when outdoor temperature is comfortable and indoor air quality is poor (high CO₂)
- Close window during rain, at night, or when outdoor temperature is extreme
- Adjust window opening degree based on indoor/outdoor conditions

**Constraints and safety requirements**:
- Never open during rain or when rain is detected
- Close at night for security
- Do not open in extreme temperatures (too hot/cold)
- Must be able to override manually in emergencies

**Environmental triggers**:
- Indoor CO₂ levels > 1000 ppm for opening
- Indoor CO₂ levels < 800 ppm for closing (if other conditions allow)
- Temperature range 18-26°C for opening (adjustable based on season)
- Rain detection triggers immediate closure
- Time-based closure (e.g., 10 PM to 6 AM)

**Window position range**:
- 0% (fully closed) to 100% (fully open)
- Adjustable in 10% increments for partial opening

## Part 2: Sensor and Actuator Specification

**Required sensors**:
- Temperature sensor (indoor and outdoor) - measures thermal conditions
- Humidity sensor (indoor and outdoor) - helps avoid opening during humid conditions
- CO₂ sensor (indoor) - measures air quality
- Rain sensor - detects precipitation
- Light sensor - detects daylight levels
- Position sensor - indicates current window position

**Potential sources of noise/inaccuracy**:
- Temperature sensors: Placement near heat sources, calibration drift
- CO₂ sensors: Need periodic recalibration, affected by altitude
- Rain sensors: Can be triggered by snow or large dew drops

**Actuator**:
- Motorized window actuator - electric motor that opens/closes window
- Torque: Sufficient to overcome friction and weather conditions
- Position feedback: To confirm actual window position

**Backup systems**:
- Manual override for emergency situations
- Battery backup for power outages
- Mechanical lock for security

## Part 3: Control Algorithm Design

```
Start
  |
  v
Read sensor values (T_indoor, T_outdoor, CO₂, Humidity, Rain, Light)
  |
  v
IF rain detected
  THEN close window (set position = 0%)
  ELSE
    IF (T_outdoor is in comfort range) AND (CO₂ is high) AND (security time allows)
      THEN calculate desired position based on CO₂ level and temperature
      ELSE gradual return to closed position
    END IF
  END IF
  |
  v
Check safety limits (position, torque, time)
  |
  v
Send actuator command
  |
  v
Verify position feedback
  |
  v
Wait for next control cycle (e.g., 30 seconds)
```

**Control strategy**:
Closed-loop control with multiple inputs and safety checks. The position is continuously adjusted based on sensor inputs.

**Handling conflicting signals**:
- Rain detection always takes priority (safety first)
- If CO₂ is high but outdoor temperature is extreme, maintain minimal ventilation
- If security time is violated but air quality is very poor, partially open at safe times

**Responding to rapid changes**:
- Use filtering to prevent oscillation from sudden environmental changes
- Gradual adjustment to avoid mechanical stress
- Shorter control cycles during changing conditions

## Part 4: Safety and Reliability Measures

**Emergency procedures**:
- Manual override switch immediately disables automated control
- Fire alarm integration - opens windows if needed (if safe temperature)
- Power failure - window remains in last safe position or moves to closed position

**Sensor failure handling**:
- Redundant sensors where critical (e.g., dual temperature sensors)
- Default safe behavior if sensor fails (typically window closure)
- Error detection and alerting to user

**Fallback behaviors**:
- If main control fails, manual operation remains available
- If positioning feedback fails, return to fully closed position
- If communication with sensors fails, return to closed position

**User override**:
- Physical switch on wall for manual control
- Mobile app with override capability
- Temporary override with automatic return after set time

## System Diagram

```
Environmental Sensors:
Temperature (In/Out) ──┐
Humidity (In/Out)      │
CO₂ (Indoor)          │    ┌─────────────────┐    ┌─────────────┐
Rain Sensor           ├───►│ Control System  ├───►│ Motorized   │
Light Sensor          │    │ (Microcontroller│    │ Window Actuator
Position Feedback     ─┘    └─────────────────┘    └─────────────┘
                             │    ▲
                             │    │
                        ┌────▼────┴─────┐
                        │ User Interface │
                        │ (Switch/App)   │
                        └────────────────┘
```

## Key Learning Points

Control system design in Physical AI requires careful consideration of:
1. Multiple inputs and their interactions
2. Safety as the highest priority
3. Handling of conflicting requirements
4. Sensor reliability and redundancy
5. Real-time response requirements
6. User control and override capabilities