class RandomFunction {

    //To generate a random CIN 
    generateRandomCIN() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';

        let cin = '';

        // First character is a letter
        cin += letters.charAt(Math.floor(Math.random() * letters.length));

        // Next 5 characters are digits
        for (let i = 0; i < 5; i++) {
            cin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Next 2 characters are letters
        for (let i = 0; i < 2; i++) {
            cin += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        // Next 4 characters are digits
        for (let i = 0; i < 4; i++) {
            cin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Next 3 characters are letters
        for (let i = 0; i < 3; i++) {
            cin += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        // Last 6 characters are digits
        for (let i = 0; i < 6; i++) {
            cin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        return cin;
    }


    //To generate a random PAN Number
    generateRandomPAN() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';

        let pan = '';

        // First 5 characters are letters
        for (let i = 0; i < 5; i++) {
            pan += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        // Next 4 characters are digits
        for (let i = 0; i < 4; i++) {
            pan += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Last character is a letter
        pan += letters.charAt(Math.floor(Math.random() * letters.length));

        return pan;
    }


}

module.exports=RandomFunction;