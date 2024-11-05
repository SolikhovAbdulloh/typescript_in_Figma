const card = document.getElementById("card_market_server") as HTMLDivElement;
const btn_Food = document.getElementById("Foods") as HTMLButtonElement;
const btn_flights = document.getElementById("flights") as HTMLButtonElement;
const btn_Health = document.getElementById("Health") as HTMLButtonElement;
const btn_Science = document.getElementById("Science") as HTMLButtonElement;
const btn_Art_design = document.getElementById(
  "Art_design"
) as HTMLButtonElement;
const btn_All = document.getElementById("All") as HTMLButtonElement;
const bars_menu = document.getElementById("menu_header") as HTMLElement;

const products:any[] = [];

async function Nation(url: string): Promise<any> {
  const respon = await fetch(url);
  const promise = await respon.json();
  //   console.log(promise);

  products.push(...promise);

  return promise;
}

Nation("http://localhost:3000/posts");

interface product {
  category: string | object;
}
btn_All.addEventListener("click", () => {
  PrintData(products);
});

btn_Food.addEventListener("click", () => {
  PrintData(filter(products, "Food"));
});

btn_Art_design.addEventListener("click", () => {
  PrintData(filter(products, "Art & Design"));
});

btn_Health.addEventListener("click", () => {
  PrintData(filter(products, "Health"));
});

btn_Science.addEventListener("click", () => {
  PrintData(filter(products, "Science"));
});

btn_flights.addEventListener("click", () => {
  PrintData(filter(products, "Flights"));
});

function filter(object: product[], category: string): object {
  return products.filter((product) => product.category === category);
}

function PrintData(products: any): any {
  card.innerHTML = "";

  products.forEach((item: any) => {
    let div = document.createElement("div");

    div.innerHTML = `
      <div class = "flex flex-col w-[100%]">
         <div class="card grid grid-cols-[repeat(2,2fr)] gap-4 bg-gray-200 p-4">
          <img src="${item.img}" alt="img1" />
          <div class="flex  flex-col items-start justify-around">
            <p
              class="flex items-center font-black text-[12px] text-[#4592ff] w-[100%] justify-between"
            >
              ${item.category} <i class="fa-solid fa-bookmark" style="color: #74C0FC;"></i>
            </p>
            <p class="font-bold text-[20px] leading-[125%] text-[#262d33]">
                ${item.title}
            </p>
            <p class="font-normal text-[14px] leading-[143%] text-[#4b5157]">
              ${item.text}
            </p>
            <p class="flex gap-3 items-center">
              Aug 6 <i class="fa-solid fa-comment"></i>342
              <i class="fa-regular fa-heart"></i> 830
            </p>
          </div>
        </div>
      </div>

      `;
    card.appendChild(div);
  });

  const bootmark = document.querySelector(".fa-bookmark") as HTMLElement;

  bootmark.addEventListener("click", () => {
    bootmark.style.color = "green";
    bootmark.innerHTML = "";
  });
}
