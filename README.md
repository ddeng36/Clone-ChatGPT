This is a [Next.js](https://nextjs.org/) full stack project, which is a chat application that uses AI to generate responses.The oringinal idea comes from [Sonny Sangha](https://www.youtube.com/watch?v=V6Hq_EX2LLM&t=12015s), I have added some features to the original project.

## Features
- :green_circle: Responsive - [TailwindCSS](https://tailwindcss.com/)
- :green_circle: Authentication - [NextAuth.js](https://next-auth.js.org/), [GoogleCloud] (https://console.cloud.google.com/) - Users could login with their Google account, and admin could manage the users in the GoogleCloud.
- :green_circle: Database - [Firebase](https://firebase.google.com/) - Users could create new chat, see their chat history or delete chat.
- :green_circle: AI Engine - [OpenAI](https://openai.com/) - There are 64 AI engines available, including GPT-3.5. Users could select the AI engine to chat with and more importantly, they could change parameters of the AI engine to get a favorate chat experience. 

## Extra Features
- :white_check_mark: Improved UI. Sovled the issue that the ChatRow would overflow the ChatContainer when the message is too long. Optimized the sidebar, enhanced user experience.
- :white_check_mark: Solved the timeout problem when server requesting to OpenAI. China users could not access OpenAI directly, nextjs server would also not be able to access OpenAI even with VPN. I have solved this problem by put request to front end. I also plan to solve this problem by using a proxy, which called [Cloudflare Workers](https://workers.cloudflare.com/).  
- :white_check_mark: Decreased the HTTP request to OpenAI. I have solved this problem by using SWR, which is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

## Suggestions for the Future
- :white_circle: Add a interactive UI for users to change the parameters of the AI engine. Currently, users could only change the parameters in the code.  
- :white_circle: Improve UI. Add a loading animation when the server is requesting to OpenAI. Add more dialog to tips users how to use the app. Ajust the color, size and layout of the UI to make it looks as same as the oringinal ChatGPT. Display the reponse dynamically, which means the response would be displayed word by word with a blinking cursor, not all at once.  
- :white_circle: Add GPT4, DALLE API to enpower the app. OpenAI has released GPT4 API, which is more powerful than GPT3.5. I have applied for the API, but I have not got the access yet. I will add GPT4 API to the app when I get the access.  
- :white_circle: Use proxy to solve internet access problem, make the app available for China users without VPN.  
- :white_circle: Deploy the app.  

## Getting Started
1. install [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/downloads).
2. Clone the repo
```bash
git clone the git url of this project
```
4. Substitute your own credentials in `my-chatgpt/lib/chatgpt.ts` and `my-chatgpt/.env.local`
5. Install dependencies
```bash
npm install
```
6. Run the development server
```bash
npm run dev
```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notes
- You need to be in a network environment that can access Google Cloud and OpenAI.
- `text3-davinci` is the default AI engine, if you want to use other AI engine, you need to change the parameters in `my-chatgpt/lib/chatgpt.ts`.
- If you get error, please check your console.