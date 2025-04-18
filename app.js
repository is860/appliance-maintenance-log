const form = document.getElementById('appliance-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const applianceName = document.getElementById('appliance-name').value;
        const purchaseDate = document.getElementById('purchase-date').value;
        const lastServiced = document.getElementById('last-serviced').value;
        const serviceInterval = document.getElementById('service-interval').value;

        const appliances = JSON.parse(localStorage.getItem('appliances')) || [];

        const nextServiceDate = new Date(lastServiced);
        nextServiceDate.setMonth(nextServiceDate.getMonth() + parseInt(serviceInterval));

        const newAppliance = {
            name: applianceName,
            purchaseDate: purchaseDate,
            lastServiced: lastServiced,
            nextService: nextServiceDate.toLocaleDateString(),
        };

        appliances.push(newAppliance);
        localStorage.setItem('appliances', JSON.stringify(appliances));

        alert('Appliance added!');
        window.location.href = 'appliance-list.html';
    });
}

const applianceList = document.getElementById('appliance-list');
if (applianceList) {
    const appliances = JSON.parse(localStorage.getItem('appliances')) || [];

    applianceList.innerHTML = '';
    appliances.forEach((appliance) => {
        const li = document.createElement('li');
        li.classList.add('p-4', 'border', 'rounded-lg', 'shadow-md', 'mb-4');
        li.innerHTML = `
            <strong class="text-lg">${appliance.name}</strong>
            <p>Purchase Date: ${appliance.purchaseDate}</p>
            <p>Last Serviced: ${appliance.lastServiced}</p>
            <p>Next Service: ${appliance.nextService}</p>
        `;
        applianceList.appendChild(li);
    });
}
