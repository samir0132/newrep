
import * as speakeasy from 'speakeasy';
export class OtpService {
    private otps: { [key: string]: string } = {}; // store OTPs in a dictionary
     secret = speakeasy.generateSecret({ length: 20 }); // Generate a secret key

    generateOtp(): string {

        // @ts-ignore
        return speakeasy.totp({
            secret: this.secret.base32,
            encoding: 'base32'
        });

    }


    storeOtp(phoneNumber: string, otp: string) {
        this.otps[phoneNumber] = otp; // store OTP in dictionary with phone number as key
    }

    getOtp(phoneNumber: string): string {
        return   this.otps[phoneNumber]; // retrieve OTP from dictionary

    }
}
