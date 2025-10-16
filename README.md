Friendly Error Helper 🧠

"Don’t just fix errors — understand them."

Friendly Error Helper is an intelligent developer-assistant tool designed to make debugging easier, faster, and smarter. It's a VS Code extension that reads your code error messages, understands them using AI, and provides instant, clear explanations and solutions directly within your editor.

(This is a placeholder for a future demo GIF)

✨ Core Features (Phase 1 - Complete)

Instant Error Analysis: Select any error text from your code editor or terminal.

AI-Powered Explanations: Get a detailed breakdown of what the error means, its root cause, and how to fix it.

Interactive Webview Panel: The analysis is displayed in a clean, easy-to-read panel right next to your code.

Offline Mode: Includes a built-in database of the most common JavaScript errors, providing instant offline help without needing an API key.

🚀 Getting Started

To run this extension locally for development:

Clone the repository:

git clone [https://github.com/YOUR_USERNAME/friendly-error-helper.git](https://github.com/YOUR_USERNAME/friendly-error-helper.git)


Navigate to the project directory:

cd friendly-error-helper


Install dependencies:

npm install


Open in VS Code:

code .


Run the Extension:

Press F5 to open the "Extension Development Host" window.

This will launch a new VS Code window with the extension running.

⚙️ How to Use

There are two primary ways to use the Friendly Error Helper:

From the Code Editor:

Select any error message in your code.

Right-click and choose Friendly Helper: Analyze Error.

From the Terminal (Recommended):

Run your code and get an error in the VS Code integrated terminal.

Select the error message text (e.g., TypeError: Assignment to constant variable.).

Copy the text to your clipboard (Ctrl + C).

Open the Command Palette (Ctrl + Shift + P), search for Friendly Helper: Analyze Error, and press Enter.

🗺️ Future Roadmap

This project is just getting started! Here is the plan for future development:

🌐 Phase 2: Chrome Extension

Automatically capture and analyze errors from the browser's developer console.

☁️ Phase 3: Live API & Cloud Sync

Integrate a live Gemini API for analyzing a wider range of errors.

Sync error history between VS Code and Chrome using a cloud backend.

🤖 Advanced AI Features

Provide AI auto-fix suggestions and corrected code snippets.

Context-aware debugging that reads surrounding code for better suggestions.

Support for more languages like Python, Java, and C++.

💻 Tech Stack

Framework: Visual Studio Code Extension API

Language: JavaScript (Node.js)

Dependencies: marked (for rendering), node-fetch (for future API calls)

License

This project is licensed under the MIT License. See the LICENSE file for details.
