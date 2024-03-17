import env from "@/helpers/env";
import TOrder from "@/validators/TOrder";
import TQuestion from "@/validators/TQuestion";

const axios = require('axios');

async function sendMessageToTelegram(message: string) {
    try {
        const apiUrl = `https://api.telegram.org/bot${env.TOKEN_BOT}/sendMessage`;

        await axios.post(apiUrl, {
            chat_id: env.CHAT_ID,
            text: message
        });
    } catch (error) {
        console.error('Error sending message to Telegram:', error.message);
    }
}

export async function processOrder(order: TOrder) {

    const message = `New order 💸
    \nName: ${order.name}
    \nEmail: ${order.email}
    \nAnother Way to contact: ${order.anotherWay}
    \nCountry: ${order.country}
    \nCity Or Town: ${order.cityOrTown}
    \nState Or Province: ${order.stateOrProvince}
    \nAddress Line 1: ${order.addressLine1}
    \nAddress Line 2: ${order.addressLine2}
    \nPost code: ${order.postCode}
    \nPay now: ${order.payNow}
    `;
    await sendMessageToTelegram(message);
}

export async function processQuestion(question: TQuestion) {

    const message = `New question ⁉️
    \nContact: ${question.contact}
    \nQuestion: ${question.question}
    `;
    await sendMessageToTelegram(message);
}
