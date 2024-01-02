import emailjs from '@emailjs/browser';
import { publicKey, serviceId, templateId } from './config';

/**
 * Sends an email and returns the status.
 * @param data The data to send
 * @returns `true` if the email was sent successfully, `false` otherwise
 */
export const sendEmail = async (data: { name: string, email: string, message: string }) => {
    const response = await emailjs.send(serviceId, templateId, data, publicKey);
    
    if (response.status === 200) {
        return true;
    }

    return false;
}
