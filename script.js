    function clearResults() {
        document.getElementById('result1').textContent = '';
        document.getElementById('error1').textContent = '';
        document.getElementById('result2').textContent = '';
        document.getElementById('error2').textContent = '';
    }

    function toggleConversionSection() {
        clearResults();
        const conversionType = document.getElementById('conversionType').value;
        const bsToADSection = document.getElementById('bsToADSection');
        const adToBSSection = document.getElementById('adToBSSection');

        if (conversionType === 'BStoAD') {
            bsToADSection.style.display = 'block';
            adToBSSection.style.display = 'none';
        } else if (conversionType === 'ADtoBS') {
            adToBSSection.style.display = 'block';
            bsToADSection.style.display = 'none';
        } else {
            bsToADSection.style.display = 'none';
            adToBSSection.style.display = 'none';
        }
    }

    async function convertBSToAD() {
        clearResults();
        const year = document.getElementById('bsYear').value;
        const month = document.getElementById('bsMonth').value;
        const day = document.getElementById('bsDay').value;

        if (!year || !month || !day) {
            document.getElementById('error1').textContent = 'Please fill in all fields.';
            return;
        }

        try {
            const response = await fetch(`https://sudhang.pythonanywhere.com/BStoAD/${year}/${month}/${day}`);
            const data = await response.json();

            if (response.ok) {
                // Format the AD date as required
                const formattedADDate = `${data.ad_date.day}, ${getMonthName(data.ad_date.month)} ${data.ad_date.year}`;
                document.getElementById('result1').textContent = formattedADDate; // Only display the date
            } else {
                document.getElementById('error1').textContent = data.error || 'An error occurred.';
            }
        } catch (error) {
            document.getElementById('error1').textContent = 'Error fetching the date. Please try again.';
            console.error('Fetch error:', error);
        }
    }

    async function convertADToBS() {
        clearResults();
        const year = document.getElementById('adYear').value;
        const month = document.getElementById('adMonth').value;
        const day = document.getElementById('adDay').value;

        if (!year || !month || !day) {
            document.getElementById('error2').textContent = 'Please fill in all fields.';
            return;
        }

        try {
            const response = await fetch(`https://sudhang.pythonanywhere.com/ADtoBS/${year}/${month}/${day}`);
            const data = await response.json();

            if (response.ok) {
                // Format the BS date as required
                const formattedBSDate = `${data.bs_date.day} ${getBSMonthName(data.bs_date.month)} ${data.bs_date.year}`;
                document.getElementById('result2').textContent = formattedBSDate; // Only display the date
            } else {
                document.getElementById('error2').textContent = data.error || 'An error occurred.';
            }
        } catch (error) {
            document.getElementById('error2').textContent = 'Error fetching the date. Please try again.';
            console.error('Fetch error:', error);
        }
    }

    function getMonthName(month) {
        const monthNames = [
            "", // placeholder for index 0
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month];
    }

    function getBSMonthName(month) {
        const bsMonthNames = [
            "", // placeholder for index 0
            "Baishak", "Jestha", "Ashadh", "Shrawan", "Bhadra",
            "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
        ];
        return bsMonthNames[month];
    }
