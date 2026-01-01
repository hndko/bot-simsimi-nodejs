const axios = require("axios");
const readline = require("readline");
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require("ora");
const boxen = require("boxen");
require("dotenv").config();

// Configuration
const API_KEY =
  process.env.SIMSIMI_API_KEY || "9tNz4BeGLys8GzFhbAh8zFZB8ga1K16JQM4zCErM";
const API_URL = "https://wsapi.simsimi.com/190410/talk";
const LANG = process.env.SIMSIMI_LANG || "id";

// Initialize Readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.green("|[~] Saya : "),
});

/**
 * clearScreen
 * Clears the terminal screen for a fresh view
 */
const clearScreen = () => {
  console.clear();
};

/**
 * showBanner
 * Displays the application banner using Figlet and Boxen
 */
const showBanner = () => {
  clearScreen();
  const title = figlet.textSync("SimSimi Bot", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  const bannerConfig = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
    backgroundColor: "black",
  };

  const bannerContent =
    chalk.cyan(title) +
    "\n" +
    chalk.yellow("----------------------------------------") +
    "\n" +
    chalk.green(" Author  : Kyuoko") +
    "\n" +
    chalk.green(" Code    : NodeJS (Modernized)") +
    "\n" +
    chalk.green(" License : ISC") +
    "\n" +
    chalk.yellow("----------------------------------------");

  console.log(boxen(bannerContent, bannerConfig));
};

/**
 * handleInput
 * Processes the user input
 */
const handleInput = async (answer) => {
  // Pause input while processing to prevent interference
  rl.pause();

  if (!answer.trim()) {
    rl.resume();
    rl.prompt();
    return;
  }

  if (answer.toLowerCase() === "exit") {
    console.log(chalk.yellow("Bye bye! 👋"));
    rl.close();
    process.exit(0);
  }

  await getSimiResponse(answer);

  // Resume input after processing
  rl.resume();
  rl.prompt();
};

/**
 * getSimiResponse
 * Sends the user input to SimSimi API and displays the response
 * @param {string} text - The user's message
 */
const getSimiResponse = async (text) => {
  const spinner = ora({
    text: "Simi is thinking...",
    color: "yellow",
  }).start();

  try {
    const response = await axios.post(
      API_URL,
      {
        utext: text,
        lang: LANG,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    spinner.stop();

    if (response.data && response.data.atext) {
      console.log(chalk.yellow(`|[!] Simi : ${response.data.atext}`));
    } else {
      console.log(chalk.red("|[!] Simi : (No response)"));
    }
  } catch (error) {
    spinner.stop();
    // Log brief error message
    const status = error.response ? error.response.status : "Unknown";
    console.log(chalk.red(`|[!] Simi Error (${status}): ${error.message}`));

    if (status === 403 || status === 401) {
      console.log(chalk.red("Hint: Check your API Key in .env file."));
    }
  }
};

// Start the Application
const start = () => {
  showBanner();
  rl.prompt();

  rl.on("line", (line) => {
    handleInput(line);
  });

  // Handle Ctrl+C gracefully
  rl.on("SIGINT", () => {
    rl.close();
  });

  rl.on("close", () => {
    console.log(chalk.yellow("\nBye bye! 👋"));
    process.exit(0);
  });
};

start();
