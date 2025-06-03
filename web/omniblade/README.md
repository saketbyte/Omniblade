# Project Requirement Document

**Project Title**: Omniblade  
**Version**: 1.0  
**Prepared by**: Samriddh Singh  
**Date**: 23 May 2025  

---

## 1. Purpose & Problem Statement

### Problem  
Modern users frequently juggle between utilities like translators, converters, clipboard managers, and search tools. These utilities are often scattered across different apps or browser tabs, causing inefficiencies and context-switching fatigue.

### Solution  
A floating browser extension and desktop utility app that integrates essential tools into a lightweight, always-accessible panel. Designed to reduce cognitive overhead and enhance productivity by combining multiple utilities in a single UX-friendly workspace.

---

## 2. System Overview

The application will consist of:

- A React-based floating UI panel (browser extension or standalone)
- Dockerized architecture with container isolation and orchestration
- Integrations with multiple third-party APIs including Gemini AI

---

## 3. System Design & Architecture

### Design Pattern: Modular Micro-frontend  

Each tool/module is treated as an independent UI and backend service component, enabling:

- Independent development and testing  
- Easy scalability  
- Future plugin/extension capabilities  

### Architectural Layers:

#### A. Frontend (React + TailwindCSS + Chrome Extension APIs)

- Floating overlay popup with shortcut key or extension icon  
- Module components (Clipboard, Converter, etc.) organized as tabs  
- Redux/Context for state management  

#### B. Redis

Cache layer for:

- Weather data (location-based)  
- Translations  
- Recently accessed clipboard items  
- Optional Pub/Sub for real-time sync  

#### C. Docker & Orchestration

Containers:

- Frontend (React)  
- Backend (Express)  
- Redis (caching)  
- `docker-compose.yml` for orchestration and environment isolation  

---

## 4. Key Features (MVP)

| Feature             | Description                                                               |
|---------------------|---------------------------------------------------------------------------|
| Clipboard Manager   | Store and categorize clipboard history, allow copy-paste reuse            |
| Weather             | Fetch current weather via location-aware API                              |
| AI Chatbot          | Utilize Gemini AI with just one click instead of moving to different tab  |
| Google Search       | Inline Google search with auto-open in new tab                            |
| Tabbed UI Panel     | Easy to switch between utilities via draggable/floating tabbed interface  |

---

## 5. External API Integrations

| Service       | API/Provider        | Usage                          |
|---------------|---------------------|--------------------------------|
| Weather       | WeatherAPI          | Current weather by location    |
| Gemini        | Gemini AI (free)    | Text translation, chatbot      |
| Google Search | Custom Search API   | Quick lookups                  |

---

## 6. Technology Stack

| Layer               | Tech Choices                                      |
|---------------------|--------------------------------------------------|
| Frontend            | React, TailwindCSS, Chrome APIs                  |
| State Management    | Context API / Redux                              |
| Caching             | Redis                                            |
| Containerization    | Docker, Docker Compose                           |
| CI/CD               | GitHub Actions / Azure DevOps (planned)          |
| Auth (Future)       | Firebase Auth / OAuth 2.0                        |
| Sync & Storage (Future) | Firebase / Cloudflare R2 / IndexedDB         |

---

## 7. Future Enhancements

| Feature                 | Justification                                      |
|-------------------------|---------------------------------------------------|
| Auth System             | User login to sync settings across devices        |
| Cloud Clipboard Sync    | Cross-device clipboard sharing                    |
| Analytics Dashboard     | Usage insights for each tool                      |
| Smart Calendar Add-ons  | Clipboard dates → Add to Google Calendar          |
| AI Text Summarizer      | AI-powered clipboard insights                     |
| Plugin Architecture     | Allow third-party tool integrations               |
| Docker Secrets          | Secure sensitive data like API keys               |
| Mobile Companion App    | Sync clipboard + utilities to mobile              |

---

## 9. Workflow & CI/CD (Planned)

- Docker builds for each component  
- Environment-specific `.env` files  
- GitHub Actions pipeline for build/test/deploy  
- Version tagging + rollback support  

---

## 10. Milestones (Tentative)

| Milestone                   | Target Date     |
|-----------------------------|-----------------|
| MVP Completion              | June 3, 2025    |
| External API Integration    | June 5, 2025    |
| Redis Caching Optimization  | June 15, 2025   |
| Docker Deployment Setup     | June 20, 2025   |
| Cloud Sync & Auth           | July 15, 2025   |
