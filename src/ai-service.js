import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AQ.Ab8RN6Izb9RDz3CT-ZQFsFDnyF-OL-CgzoSX1xIjG2lohFYQmw"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeJobText(text) {
  const prompt = "أنت خبير توظيف هندسي في السعودية. حلل هذا النص واستخرج: 1. المهارات المطلوبة. 2. سنوات الخبرة. 3. دورة مقترحة. اكتب التقرير بالعربي. النص: " + text;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
