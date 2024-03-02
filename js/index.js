// console.log('i am working')
const allData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const helloData = await res.json();
    const data = helloData.data.tools;
    // console.log(data);
    displayData(data)
}

const displayData = (data) => {
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    data.forEach(item => {
        // console.log(item)
        const div = document.createElement('div');
        div.classList = `p-5 border-2`;
        div.innerHTML = `
        <img class="mb-4 w-full" src="${item.image}" alt="">
                <h4 class="text-2xl font-bold mb-5">Features</h4>
                <ul class="ml-5">
                    <li class="list-decimal">${item.features[0]}</li>
                    <li class="list-decimal">${item.features[1]}</li>
                    <li class="list-decimal">${item.features[2]}</li>
                </ul>
                <hr class="my-4">
                <h3 class="text-2xl font-bold mb-4">${item.name}</h3>
                <div class="flex gap-2 justify-between items-center">
                    <div>
                        <img src="./Frame.png" alt="">
                        <p>${item.published_in}</p>
                    </div>
                    <div class="border-2 rounded-full">
                    <button class="flex" onclick="showModal('${item.id}')">
                        <img class="p-2" src="./images/Frame2.png" alt="">
                    </button>
                    </div>
                </div>
        `;
        cardContainer.appendChild(div);
    })

}

const showModal = async (id) => {
    showDetails.showModal();
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const mainData = await res.json();
    const data = mainData.data;
    // console.log(id)
    console.log(data)
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex gap-4 ">
    <div class="bg-red-200 p-6 border-4 border-red-600 rounded-lg space-y-5">
        <div>
            <h1 class="text-black">${data.description}</h1>
        </div>
        <div class="flex gap-4">
            <div class="bg-white p-5 rounded-lg">
                <h1 class="text-green-500">${data.pricing[0].price}</h1>
            </div>
            <div class="bg-white p-5 rounded-lg">
                <h1 class="text-red-500">${data.pricing[1].price}</h1>
            </div>
            <div class="bg-white p-5 rounded-lg">
                <h1 class="text-black">${data.pricing[2].price}</h1>
            </div>
        </div>
        <div class="flex gap-5 justify-between items-center">
            <div>
                <h3 class="text-2xl">Features</h3>
                <ul>
                    <li>${data.features['1'].feature_name}</li>
                    <li>${data.features['2'].feature_name}</li>
                    <li>${data.features['3'].feature_name}</li>
                </ul>
            </div>
            <div>
                <h3  class="text-2xl">Integrations</h3>
                <ul>
                    <li>${data.integrations[0]}</li>
                    <li>${data.integrations[1]}</li>
                    <li>${data.integrations[2]}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="p-6 border-4 border-red-600 rounded-lg space-y-5">
        <img src="${data.image_link[0]}" alt="">
        <div class="text-center">
            <h3 class="font-bold">${data?.input_output_examples[0]?.input}</h3>
            <p>${data.input_output_examples[0].output}</p>
        </div>
    </div>
</div>
    `;
    detailsContainer.appendChild(div);
}

allData();