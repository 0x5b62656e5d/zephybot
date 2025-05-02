import { gemini } from "../index";

const getGeminiResponse = async (prompt: string): Promise<string | null> => {
    try {
        const res = await gemini.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                systemInstruction: `You are a tech support agent. Answer the question as best as you can. You will mostly be helping out people that own TUF or ROG laptops or PC parts. Make sure that your response is fewer than 3500 characters. That is a hard limit.`,
                tools: [
                    {
                        googleSearch: {},
                    },
                ],
            },
        });

        return res.text as string;
    } catch (error) {
        console.error(`[ERROR] getGeminiResponse.ts\n${error}`);
        return null;
    }
};

export { getGeminiResponse };
