// const { Configuration, OpenAI } = require('openai');

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_KEY,
// });

// module.exports = async (message, client) => {
//     if (!message.content.startsWith('<@1151023270636818483>')) {
//         return;
//     }

//     await message.channel.sendTyping();

//     const typingInterval = setInterval(() => {
//         message.channel.sendTyping();
//     }, 5000);

//     const response = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//             {
//                 // name:
//                 role: 'system',
//                 content: 'You are a friendly tech support.'
//             },
//             {
//                 // name:
//                 role: 'user',
//                 content: message.content.substring(23),
//             }
//         ],
//     });

//     clearInterval(typingInterval);

//     if (!response) {
//         return message.reply("I'm having trouble with OpenAI at the moment. Please try again later.");
//     }

//     message.reply(response.choices[0].content);
// };