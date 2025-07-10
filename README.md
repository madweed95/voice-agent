# Jessica Voice Call Modal – React + TypeScript + Vite 🎤💬

This project implements a custom voice call modal for a virtual assistant (Jessica) using React, TypeScript, and Vite. The modal provides a seamless, interactive voice experience with real-time audio recording, silence detection, and message history.

## Solution Overview ✨

The Jessica voice call modal features:

- 🖋️ Custom font integration (Gilroy, Inter) for a modern look
- 🎨 Custom-styled modal and buttons with gradients and soft UI effects
- 🎙️ Audio recording with auto-stop on silence using Voice Activity Detection (VAD)
- 🔄 Real-time audio send/receive via WebSocket (audio/wav Blobs)
- 🗂️ Scrollable message history with smooth UI
- 📈 Custom waveform audio player with progress gradient
- 🔴 Pulsing record button that visually responds to speech
- 🔌 WebSocket connection persists while the modal is open, disconnects only when closed
- 🛠️ All UI/UX and technical issues addressed for a production-ready experience

## Implemented Features 🚀

- **🖋️ Custom Fonts:** Gilroy and Inter loaded via `@font-face` and set as default in CSS
- **🎨 Gradient UI:** Linear-gradient backgrounds for modal and dialog content
- **🎙️ Voice Activity Detection:** Uses `@ricky0123/vad-react` to auto-stop recording on silence
- **🔄 WebSocket Audio:** Audio is sent/received as `audio/wav` Blobs over a persistent WebSocket connection
- **🗂️ Message History:** Scrollable, visually clean message history with overflow handling
- **📈 Custom Player:** Elegant waveform player with gradient progress
- **🔴 Pulsing Record Button:** Button animates in response to speech (VAD state)
- **🔌 Connection Management:** WebSocket only connects when modal is open, and resets history view on close
- **✨ UI/UX Tweaks:** All buttons, modals, and player components styled for a modern, soft look

## Additional Libraries/Tools Used 🧩

- [`@ricky0123/vad-react`](https://www.npmjs.com/package/@ricky0123/vad-react) – Voice Activity Detection
- [`react-use-websocket`](https://www.npmjs.com/package/react-use-websocket) – WebSocket management
- [`react-audio-voice-recorder`](https://www.npmjs.com/package/react-audio-voice-recorder) – Audio recording
- 🌀 Tailwind CSS – Utility-first styling
- 🧹 ESLint & Prettier – Linting and formatting

## Running the App Locally 🏃‍♂️

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to use the app. 🌐

4. **Backend WebSocket:**
   Ensure your backend WebSocket server is running at `ws://localhost:8080` for full voice call functionality. 🖥️

---
