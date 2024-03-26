class RandomFunction {


    // Generate a random first name
    generateRandomFirstName() {
        const firstNames = [
            'Jackson', 'Madison', 'Landon', 'Chloe', 'Grayson', 'Zoe', 'Wyatt', 'Grace', 'Caleb', 'Lily',
            'Luke', 'Hannah', 'Gabriel', 'Natalie', 'Isaac', 'Avery', 'Ryan', 'Addison', 'Nathan', 'Ella',
            'David', 'Scarlett', 'Owen', 'Victoria', 'Evan', 'Aria', 'Jack', 'Bella', 'Levi', 'Samantha',
            'Nicholas', 'Layla', 'Tyler', 'Penelope', 'Christian', 'Aubrey', 'Jonathan', 'Nora', 'Samuel', 'Camila'
        ];
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    }

    // Generate a random last name
    generateRandomLastName() {
        const lastNames = [
            'Clark', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Harris', 'Scott', 'Green',
            'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips',
            'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed',
            'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Jack', 'Cox', 'Howard'
        ];
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    // Generate a random organization name
    generateRandomOrganizationName() {
        const organizationNames = [
            'Bright Horizons', 'Tech Titans', 'Innovation Hub', 'Pixel Perfect', 'Quantum Solutions',
            'Elite Creations', 'Code Masters', 'Digital Dreamers', 'Global Vision', 'Agile Solutions',
            'NexTech Innovations', 'Data Dexterity', 'Smart Solutions', 'Fusion Technologies', 'Web Wizards',
            'Future Horizons', 'Silver Lining', 'Cyber Dynamics', 'Tech Savvy', 'Virtual Ventures',
            'Digital Architects', 'Innovate Labs', 'Cloud Chasers', 'Tech Trek', 'Alpha Omega',
            'Synergy Solutions', 'Epic Innovations', 'Summit Strategies', 'Tech Fusion', 'Phoenix Solutions',
            'Elevate Labs', 'Infinite Solutions', 'Byte Builders', 'Strategic Synergy', 'InnovaTech',
            'Pioneer Partners', 'Blue Sky Technologies', 'Quantum Leap', 'Dynamic Designs', 'Apex Solutions',
            'Nova Nexus', 'Hyperion Innovations', 'Tech Trails', 'Innovate Zone', 'Future Forge',
            'Digital Dynamics', 'Vertex Ventures', 'Strategic Solutions', 'Creative Catalysts', 'Prime Partners'
        ];

        const randomOrganizationName = organizationNames[Math.floor(Math.random() * organizationNames.length)];

        const now = new Date();
        const dateString = `${now.getDate().toString().padStart(2, '0')}`;
        const timeString = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

        return `${randomOrganizationName}_${dateString}${timeString}`;
        // return organizationNames[Math.floor(Math.random() * organizationNames.length)];
        // const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        // const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

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


    addMinutesToCurrentTime(timeString) {
        // Split the string at the colon
        var parts = timeString.split(':');

        // Extract the minutes part after the first colon
        var minutes = parseInt(parts[1]); // Extracting minutes part and converting to integer

        // // Create a new Date object
        // var currentDate = new Date();

        // // Get the current time
        // var currentMinutes = currentDate.getMinutes();

        // // Calculate the new minutes
        // var newMinutes = minutes + currentMinutes;

        // Ensure newMinutes doesn't exceed 60
        // if (newMinutes >= 60) {
        //     newMinutes %= 60;
        // }

        // Return the new minutes
        // return newMinutes;
        return minutes;
    }


    deadlineMinutes(minutes, contractTime, loaIssuance, loaAcceptance) {

        // Calculate the new minutes
        var newMinutes = parseInt(minutes) + parseInt(contractTime) + parseInt(loaIssuance) + parseInt(loaAcceptance);
        return newMinutes;
    }

    //     // Test the function
    //     var time = "Expires in 10:35:40";
    // console.log("New minutes:", addMinutesToCurrentTime(time));



}

module.exports = RandomFunction;