class RandomFunction {


    // Generate a random first name
    generateRandomFirstName() {
        const firstNames = [
            'John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Riya',
            'Ethan', 'Emily', 'Daniel', 'Isabella', 'Benjamin', 'Amelia', 'Logan', 'Mia', 'Matthew', 'Charlotte'
        ];
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    }

    // Generate a random last name
    generateRandomLastName() {
        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson',
            'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'
        ];
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    // Generate a random organization name
    generateRandomOrganizationName() {
        // const organizationNames = [
        //     'Tech Solutions', 'Innovative Designs', 'Global Enterprises', 'Creative Minds', 'Digital Solutions', 
        //     'NextGen Technologies', 'Smart Systems', 'CodeCraft', 'Agile Innovations', 'FutureTech', 
        //     'TechGenius', 'Data Dynamics', 'Digital Edge', 'TechCraft', 'Software Wizards', 
        //     'TechStar', 'Visionary Technologies', 'Data Systems', 'Innovative Minds', 'Strategic IT'
        // ];
        const organizationNames = [
            'Creative Minds', 'FutureTech', 'TechGenius', 'TechCraft', 'TechStar'
        ];
        return organizationNames[Math.floor(Math.random() * organizationNames.length)];
    }

    // Generate a random Phone number
    generateRandomMobileNumber() {
        const number = Math.floor(Math.random() * 1000000000); // Random 9-digit number
        return number.toString().padStart(10, '9');
    }

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

    //To generate a random GSTIN Number
    generateRandomGSTIN() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';

        let gstin = '';

        // First 2 characters are randomly selected from digits
        for (let i = 0; i < 2; i++) {
            gstin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Next 5 characters are randomly selected from letters
        for (let i = 0; i < 5; i++) {
            gstin += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        // Next 4 characters are randomly selected from digits
        for (let i = 0; i < 4; i++) {
            gstin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Last 1 characters are randomly selected from letters
        for (let i = 0; i < 1; i++) {
            gstin += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        // Next 1 characters are randomly selected from digits
        for (let i = 0; i < 1; i++) {
            gstin += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        // Last 2 characters are randomly selected from letters
        for (let i = 0; i < 2; i++) {
            gstin += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        return gstin;
    }

    //To generate Random Telephone number 
    generateRandomTelephoneNo() {
        const teleNo = Math.floor(Math.random() * 1000000000); // Random 9-digit number
        const telephoneNo = teleNo.toString().padStart(10, '0');
        return telephoneNo;
    }

    //To generate Random IFSC CODE
    generateRandomIFSC() {
        const bankCode = 'IDIB'; // Fixed bank code
        const branchCode = '000'; // Fixed branch code (may vary in actual use)
        const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // List of alphabets
        const digits = '0123456789'; // List of digits

        // Randomly select an alphabet for the branch name
        const branchName = alphabets.charAt(Math.floor(Math.random() * alphabets.length));

        // Randomly select 3 digits for the IFSC code
        let ifscDigits = '';
        for (let i = 0; i < 3; i++) {
            ifscDigits += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        return `${bankCode}${branchCode}${branchName}${ifscDigits}`;
    }


}

module.exports = RandomFunction;