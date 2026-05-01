# 🧟 COREX Zombie Chat System

A modern & optimized chat system built for the COREX framework.  
Designed specifically for immersive roleplay and zombie survival environments.

---

## ✨ Features

### 🎮 UI / UX
- Left-middle positioned chat (clean HUD integration)
- Fully transparent output (non-intrusive gameplay)
- Smooth open animation
- Minimal gray + green theme
- Lightweight and optimized (no unnecessary loops)

---

## 💬 Chat Types / Commands

### 🌍 Global Chat (`/all`)

/all [text]    Send a global message visible to all players
- Send a global message visible to all players  
- Color: **Green**  
- Used for announcements or global communication  

---

### 📍 Local Chat (`/local`)
/local [text]    Send a message only to nearby players
- Only visible to nearby players (proximity-based)  
- Color: **Yellow**  
- Ideal for immersive RP conversations  

---

### 🎭 Action Chat (`/me`)
/me [action]    Perform a roleplay action (also shows above head)
- Displays roleplay actions  
- Color: **Orange**  
- Also shows text above player head (3D)  

---

## 💡 Examples
/all Server restart in 5 minutes
/local Anyone here?
/me checks weapon quietly

---

## 🧠 Chat Behavior

- Chat input only appears when pressing **T**

### Input
- Closes after a short delay when sending a message  
- Closes instantly when pressing **ESC**

### Output
- Appears when new messages arrive  
- Automatically fades out after a configurable delay  
- Old messages are preserved and shown again when reopening chat  

---

## ⌨️ Controls

| Key     | Action              |
|--------|---------------------|
| T      | Open chat           |
| ENTER  | Send message        |
| ESC    | Close chat instantly|
| ↑ / ↓  | Navigate history    |

---

## ⚙️ System Highlights

- No UI flickering or stuck states  
- Clean event-driven architecture  
- Fully compatible with COREX systems  
- Optimized for performance and scalability  

---

## 📦 Dependencies

- corex-core  
- oxmysql  

---

## 🚀 Notes

This chat system is built with an immersion-first design, making it ideal for:
- Zombie survival servers  
- Hardcore roleplay environments  
- Minimal HUD setups  

---

## 🔮 Future Expansion (Optional)

- Radio communication system  
- Voice integration (pma-voice)  
- Chat bubbles above players  
- Typing indicators  
- Role-based chat (admin, faction, etc.)  

---

## 📜 License

This project is open-source and free to use.  
Modify and distribute as needed.
